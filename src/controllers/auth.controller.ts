import { Body, Controller, Get, Header, HttpCode, InternalServerErrorException, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UsersService } from '@/services/users.service';
import { Authorize } from '@/decorators/authorize.decorator';
import {
  AccessJwtTokenDataSerialize,
  AccessJwtTokenMessageBodySerialize,
  IAccessJwtTokenData,
  IAccessJwtTokenMessageBody,
} from '@/schemas/JwtToken';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody, { MessageBodySerialize } from '@/schemas/MessageBody';
import { User } from '@/models/User';
import { Session, Sessions } from '@/models/Session';
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

@Controller('auth')
export class AuthController {
  public readonly logger: Logger = createLogger(this);

  private readonly authService: AuthService;
  private readonly usersService: UsersService;

  constructor(authService: AuthService, usersService: UsersService) {
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
  @Get('profile')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'User Session Lookup Many',
    type: UserSessionLookupManyMessageBodySerialize,
  })
  @Serialize(UserSessionLookupManyMessageBodySerialize)
  async getUserSessions(@Req() req: Request): Promise<IUserSessionLookupManyMessageBody> {
    const user = req?.['user'] as User;
    const session = req?.['session'] as Session;

    const messageBody = new MessageBody<IUserSessionLookupDataMany>(HttpStatusCodes.OK, 'User Profile Lookup');
    const userSessionDataMany = [] as IUserSessionLookupDataMany;

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
