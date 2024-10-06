import { Body, Controller, Get, Header, HttpCode, InternalServerErrorException, Post, Req } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UsersService } from '@/services/users.service';
import { Authorize } from '@/decorators/authorize.decorator';
import { IAccessJwtTokenData, IAccessJwtTokenMessageBody } from '@/schemas/JwtToken';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody from '@/schemas/MessageBody';
import { User } from '@/models/User';
import { Session, Sessions } from '@/models/Session';
import type { Request } from 'express';
import type { ILoginBodyForm } from '@/schemas/LoginBodyForm';
import { IUserProfileLookupManyMessageBody, IUserProfileLookupDataMany } from '@/schemas/UserProfileLookup';
import { getUserProfileLookupDataFromSession } from '@/utils/session';

@Controller('auth')
export class AuthController {
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
    type: MessageBody<IAccessJwtTokenData>,
  })
  async signIn(@Req() req: Request, @Body() body: ILoginBodyForm): Promise<IAccessJwtTokenMessageBody> {
    return this.authService.authLogin(req, body);
  }

  @Authorize()
  @Get('profile')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'User Profile Lookup',
    type: MessageBody<IAccessJwtTokenData>,
  })
  async getProfile(@Req() req: Request): Promise<IUserProfileLookupManyMessageBody> {
    const user = req?.['user'] as User;
    const session = req?.['session'] as Session;

    const messageBody = new MessageBody<IUserProfileLookupDataMany>(HttpStatusCodes.OK, 'User Profile Lookup');
    const userProfileLookupDataMany = [] as IUserProfileLookupDataMany;

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
      const userProfileLookupData = getUserProfileLookupDataFromSession(temp, session.id, timeThresholdForOnlineCheck);

      userProfileLookupDataMany.push(userProfileLookupData);
    }

    return messageBody.setData(userProfileLookupDataMany) as IUserProfileLookupManyMessageBody;
  }
}
