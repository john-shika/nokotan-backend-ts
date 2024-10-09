import { Body, Controller, Get, Header, HttpCode, InternalServerErrorException, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { Authorize } from '@/decorators/authorize.decorator';
import { AccessJwtTokenMessageBodySerialize, IAccessJwtTokenMessageBody } from '@/schemas/JwtToken';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody from '@/schemas/MessageBody';
import { Sessions } from '@/models/Session';
import type { Request } from 'express';
import type { ILoginBodyForm } from '@/schemas/LoginFormBody';
import {
  IUserSessionLookupManyMessageBody,
  IUserSessionLookupDataMany,
  UserSessionLookupManyMessageBodySerialize,
} from '@/schemas/UserSessionLookup';
import { getUserSessionLookup } from '@/utils/session';
import { Serialize } from '@/decorators/serialize.decorator';
import { createLogger } from '@/utils/common';
import type { RequestAuthGuard } from '@/schemas/RequestAuthGuard';

@Controller('auth')
export class AuthController {
  public readonly logger: Logger = createLogger(this);

  private readonly authService: AuthService;
  private readonly usersService: UserService;

  constructor(authService: AuthService, usersService: UserService) {
    this.authService = authService;
    this.usersService = usersService;
  }

  @Post('login')
  @HttpCode(HttpStatusCodes.CREATED)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Login Account',
    type: AccessJwtTokenMessageBodySerialize,
  })
  @Serialize(AccessJwtTokenMessageBodySerialize)
  async signIn(@Req() req: Request, @Body() body: ILoginBodyForm): Promise<IAccessJwtTokenMessageBody> {
    return this.authService.authLogin(req, body);
  }

  @Authorize()
  @Post('logout')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Logout Account',
    type: MessageBody,
  })
  @Serialize(MessageBody)
  async signOut(@Req() req: RequestAuthGuard): Promise<MessageBody<unknown>> {
    return this.authService.authLogout(req);
  }

  @Authorize()
  @Get('refresh-token')
  @HttpCode(HttpStatusCodes.CREATED)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Refresh Token',
    type: AccessJwtTokenMessageBodySerialize,
  })
  @Serialize(AccessJwtTokenMessageBodySerialize)
  async refreshToken(@Req() req: RequestAuthGuard): Promise<IAccessJwtTokenMessageBody> {
    return this.authService.authRefreshToken(req);
  }

  @Authorize()
  @Get('profile')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'User Session Lookup Many',
    type: UserSessionLookupManyMessageBodySerialize,
  })
  @Serialize(UserSessionLookupManyMessageBodySerialize)
  async getUserSessions(@Req() req: RequestAuthGuard): Promise<IUserSessionLookupManyMessageBody> {
    const user = req.user;
    const session = req.session;

    const messageBody = new MessageBody<IUserSessionLookupDataMany>(HttpStatusCodes.OK, 'User Profile Lookup');
    const userSessionDataMany = [] as IUserSessionLookupDataMany;

    // get all sessions of user by user_id from prisma client
    const sessions = await (async (userId: number): Promise<Sessions> => {
      const user = await this.usersService.userSessionsPreload({
        id: userId,
      });

      if (!user) {
        throw new InternalServerErrorException();
      }

      return user.sessions ?? [];
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
