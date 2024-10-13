import * as uuid from 'uuid';
import { Injectable, InternalServerErrorException, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/globals/constants';
import HttpStatusCode from '@/utils/net/http';
import MessageBody, { EmptyMessageBody } from '@/schemas/MessageBody';
import { AccessJwtTokenData } from '@/schemas/JwtToken';
import type { IAccessJwtTokenMessageBody, IClaimsJwtToken } from '@/schemas/JwtToken';
import { SessionService } from './session.service';
import {
  createLogger,
  defineProperty,
  extractTokenFromHeader,
  getIPAddress,
  getJwtTokenCreatedAt,
  getJwtTokenExpires,
  getUserAgent,
} from '@/utils/common';
import type { ILoginBodyForm } from '@/schemas/LoginFormBody';
import type { IRegisterBodyForm } from '@/schemas/RegisterFormBody';
import type { Request } from 'express';
import type { RequestAuthGuard } from '@/schemas/RequestAuthGuard';
import type { IUserSessionLookupDataMany, IUserSessionLookupManyMessageBody } from '@/schemas/UserSessionLookupData';
import type { Sessions } from '@/models/Session';
import { getUserSessionLookup } from '@/utils/session';
import { Roles } from '@/globals/roles';

@Injectable()
export class AuthService {
  public readonly logger: Logger = createLogger(this);

  private readonly userService: UserService;
  private readonly sessionService: SessionService;
  private readonly jwtService: JwtService;

  constructor(userService: UserService, sessionService: SessionService, jwtService: JwtService) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.jwtService = jwtService;
  }

  async authLogin(@Req() req: Request, body: ILoginBodyForm): Promise<IAccessJwtTokenMessageBody> {
    const ip_addr = getIPAddress(req);
    const user_agent = getUserAgent(req);

    const user = await this.userService.userByLoginBodyForm(body);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token_id = uuid.v7();
    const sessionId = uuid.v7();

    const payload: IClaimsJwtToken = {
      jti: token_id,
      sid: sessionId,
      username: user.username,
      role: user.admin ? Roles.ADMIN : Roles.USER,
    };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secretKey,
    });

    const claimsJwtToken = this.jwtService.decode(jwtToken) as IClaimsJwtToken;
    const expiredAt = getJwtTokenExpires(claimsJwtToken);
    const createdAt = getJwtTokenCreatedAt(claimsJwtToken);

    // update empty session for insert new token

    await this.sessionService.createSession({
      user: {
        connect: { id: user.id },
      },
      uuid: sessionId,
      token_id: null,
      ip_addr,
      user_agent,
      new_token_id: token_id,
      expired_at: expiredAt,
      updated_at: createdAt,
    });

    const messageBody = new MessageBody(HttpStatusCode.CREATED, 'Created JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }

  async authRegister(@Req() req: Request, body: IRegisterBodyForm): Promise<IAccessJwtTokenMessageBody> {
    const ip_addr = getIPAddress(req);
    const user_agent = getUserAgent(req);

    const user = await this.userService.userByRegisterBodyForm(body);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token_id = uuid.v7();
    const sessionId = uuid.v7();

    const payload: IClaimsJwtToken = {
      jti: token_id,
      sid: sessionId,
      username: user.username,
      role: Roles.USER,
    };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secretKey,
    });

    const claimsJwtToken = this.jwtService.decode(jwtToken) as IClaimsJwtToken;
    const expiredAt = getJwtTokenExpires(claimsJwtToken);
    const createdAt = getJwtTokenCreatedAt(claimsJwtToken);

    // update empty session for insert new token

    await this.sessionService.createSession({
      user: {
        connect: { id: user.id },
      },
      uuid: sessionId,
      token_id: null,
      ip_addr,
      user_agent,
      new_token_id: token_id,
      expired_at: expiredAt,
      updated_at: createdAt,
    });

    const messageBody = new MessageBody(HttpStatusCode.CREATED, 'Created JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }

  async authLogout(@Req() req: RequestAuthGuard): Promise<EmptyMessageBody> {
    const session = req.session;

    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.sessionService.removeSessionById(session.id);

    return new EmptyMessageBody(HttpStatusCode.OK, 'Logged out successfully');
  }

  async authRefreshToken(@Req() req: RequestAuthGuard): Promise<IAccessJwtTokenMessageBody> {
    const user = req.user;
    const session = req.session;

    const tokenId = uuid.v7();
    const sessionId = session.uuid;

    const payload: IClaimsJwtToken = {
      jti: tokenId,
      sid: sessionId,
      username: user.username,
      role: user.admin ? Roles.ADMIN : Roles.USER,
    };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secretKey,
    });

    const claimsJwtToken = this.jwtService.decode(jwtToken) as IClaimsJwtToken;
    const expiredAt = getJwtTokenExpires(claimsJwtToken);
    const updatedAt = getJwtTokenCreatedAt(claimsJwtToken);

    await this.sessionService.updateSession({
      where: { id: session.id },
      data: {
        new_token_id: tokenId,
        expired_at: expiredAt,
        updated_at: updatedAt,
      },
    });

    const messageBody = new MessageBody(HttpStatusCode.CREATED, 'Created Refresh JWT token successfully');
    const accessJwtToken = new AccessJwtTokenData(jwtToken);

    return messageBody.setData(accessJwtToken) as IAccessJwtTokenMessageBody;
  }

  async authUserSessions(@Req() req: RequestAuthGuard): Promise<IUserSessionLookupManyMessageBody> {
    const user = req.user;
    const session = req.session;

    const messageBody = new MessageBody<IUserSessionLookupDataMany>(HttpStatusCode.OK, 'User Session Lookup');
    const userSessionDataMany = [] as IUserSessionLookupDataMany;

    // get all sessions of user by user_id from prisma client
    const sessions = await (async (userId: number): Promise<Sessions> => {
      const user = await this.userService.userSessionsPreload({
        id: userId,
      });

      if (!user) {
        throw new InternalServerErrorException();
      }

      const sessions = user.sessions ?? [];

      // inject user into all sessions
      for (const session of sessions) {
        defineProperty(session, 'user', user);
      }

      return sessions;
    })(user.id);

    // max tolerance 12 seconds for check online for session
    const timeThresholdForOnlineCheck = 12;

    for (const temp of sessions) {
      const userSessionLookupData = getUserSessionLookup(temp, session.id, timeThresholdForOnlineCheck);

      userSessionDataMany.push(userSessionLookupData);
    }

    return messageBody.setData(userSessionDataMany) as IUserSessionLookupManyMessageBody;
  }
}
