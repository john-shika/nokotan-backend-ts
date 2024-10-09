import * as uuid from 'uuid';
import { Injectable, InternalServerErrorException, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/globals/constants';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody from '@/schemas/MessageBody';
import { AccessJwtTokenData, IAccessJwtTokenMessageBody, IClaimsJwtToken } from '@/schemas/JwtToken';
import { SessionService } from './session.service';
import {
  createLogger,
  extractTokenFromHeader,
  getIPAddress,
  getJwtTokenCreatedAt,
  getJwtTokenExpiredAt,
  getUserAgent,
} from '@/utils/common';
import type { ILoginBodyForm } from '@/schemas/LoginFormBody';
import type { Request } from 'express';
import type { RequestAuthGuard } from '@/schemas/RequestAuthGuard';

@Injectable()
export class AuthService {
  public readonly logger: Logger = createLogger(this);

  private readonly userService: UserService;
  private readonly sessionService: SessionService;
  private readonly jwtService: JwtService;

  constructor(usersService: UserService, sessionsService: SessionService, jwtService: JwtService) {
    this.userService = usersService;
    this.sessionService = sessionsService;
    this.jwtService = jwtService;
  }

  async authLogin(@Req() req: Request, body: ILoginBodyForm): Promise<IAccessJwtTokenMessageBody> {
    const ip_addr = getIPAddress(req);
    const user_agent = getUserAgent(req);

    const user = await this.userService.userByLoginBodyForm(body);

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

    await this.sessionService.createSession({
      user: {
        connect: { id: user.id },
      },
      uuid: sessionUUID,
      token: null,
      ip_addr,
      user_agent,
      new_token: jwtToken,
      expired_at: expiredAt,
      updated_at: createdAt,
    });

    const messageBody = new MessageBody(HttpStatusCodes.CREATED, 'Created JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }

  async authLogout(@Req() req: RequestAuthGuard): Promise<MessageBody<unknown>> {
    const session = req.session;

    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.sessionService.removeSessionById(session.id);

    const messageBody = new MessageBody(HttpStatusCodes.NO_CONTENT, 'Logged out successfully');
    return messageBody;
  }

  async authRefreshToken(@Req() req: RequestAuthGuard): Promise<IAccessJwtTokenMessageBody> {
    const user = req.user;
    const session = req.session;

    const sessionUUID = uuid.v7();

    const payload: IClaimsJwtToken = { sub: sessionUUID, username: user.username };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secretKey,
    });

    const claimsJwtToken = this.jwtService.decode(jwtToken) as IClaimsJwtToken;
    const expiredAt = getJwtTokenExpiredAt(claimsJwtToken);
    const updatedAt = getJwtTokenCreatedAt(claimsJwtToken);

    await this.sessionService.updateSession({
      where: { id: session.id },
      data: {
        new_token: jwtToken,
        expired_at: expiredAt,
        updated_at: updatedAt,
      },
    });

    const messageBody = new MessageBody(HttpStatusCodes.CREATED, 'Created Refresh JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }
}
