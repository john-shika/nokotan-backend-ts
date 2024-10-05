import { Body, Controller, Get, Header, HttpCode, HttpStatus, InternalServerErrorException, Post, Req } from '@nestjs/common';
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
import type { ISignInBodyForm } from '@/schemas/SignInBodyForm';
import { IUserProfileLookupManyMessageBody, IUserProfileLookupDataMany, UserProfileLookupData } from '@/schemas/UserProfileLookup';
import { sessionIsOnline } from '@/utils/common';

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
    status: HttpStatusCodes.CREATED,
    description: 'Login Account',
    type: MessageBody<IAccessJwtTokenData>,
  })
  async signIn(@Req() req: Request, @Body() body: ISignInBodyForm): Promise<IAccessJwtTokenMessageBody> {
    return this.authService.signIn(req, body.username, body.password);
  }

  @Authorize()
  @Get('profile')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: HttpStatusCodes.OK,
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
    const tolerance = 12;

    for (let temp of sessions) {
      const uuid = temp.uuid;
      const used = temp.id == session.id;
      const online = sessionIsOnline(temp, tolerance);
      const ip_addr = temp.ip_addr;
      const user_agent = temp.user_agent;
      const created_at = temp.created_at.toISOString();
      const updated_at = temp.updated_at.toISOString();
      const deleted_at = temp.deleted_at?.toISOString(); // auto hidden with undefined
      const userProfileLookupData = new UserProfileLookupData(uuid, used, online, ip_addr, user_agent, created_at, updated_at, deleted_at);

      userProfileLookupDataMany.push(userProfileLookupData);
    }

    return messageBody.setData(userProfileLookupDataMany) as IUserProfileLookupManyMessageBody;
  }
}
