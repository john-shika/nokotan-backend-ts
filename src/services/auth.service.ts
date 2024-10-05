import * as uuid from 'uuid';
import { Injectable, InternalServerErrorException, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/globals/constants';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody from '@/schemas/MessageBody';
import { AccessJwtTokenData, IAccessJwtTokenMessageBody, IClaimsJwtToken } from '@/schemas/JwtToken';
import { SessionsService } from './sessions.service';
import { getIPAddress, getJwtTokenCreatedAt, getJwtTokenExpiredAt, getUserAgent } from '@/utils/common';
import type { Request } from 'express';
import { createSession } from '@/models/Session';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;
  private readonly sessionsService: SessionsService;
  private readonly jwtService: JwtService;

  constructor(usersService: UsersService, sessionsService: SessionsService, jwtService: JwtService) {
    this.usersService = usersService;
    this.sessionsService = sessionsService;
    this.jwtService = jwtService;
  }

  async signIn(@Req() req: Request, username: string, password: string): Promise<IAccessJwtTokenMessageBody> {
    const ip_addr = getIPAddress(req);
    const user_agent = getUserAgent(req);

    const user = await this.usersService.authUserPass(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const sessionUUID = uuid.v7();

    const payload: IClaimsJwtToken = { sub: sessionUUID, username: user.username };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secretKey,
    });

    const claimsJwtToken = this.jwtService.decode(jwtToken) as IClaimsJwtToken;
    const expiredAt = getJwtTokenExpiredAt(claimsJwtToken);
    const createdAt = getJwtTokenCreatedAt(claimsJwtToken);

    // update empty session for insert new token

    const session = await this.sessionsService.createSession({
      user: {
        connect: { id: user.id },
      },
      uuid: sessionUUID,
      token: '..',
      ip_addr,
      user_agent,
      new_token: jwtToken,
      expired_at: expiredAt,
      updated_at: createdAt,
    });

    if (!session) {
      throw new InternalServerErrorException();
    }

    const messageBody = new MessageBody(HttpStatusCodes.CREATED, 'Created JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }
}
