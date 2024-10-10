import { Body, Controller, Get, Header, HttpCode, InternalServerErrorException, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { Authorize } from '@/decorators/authorize.decorator';
import { AccessJwtTokenMessageBodySerialize, IAccessJwtTokenMessageBody } from '@/schemas/JwtToken';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import MessageBody, { EmptyMessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import type { Request } from 'express';
import type { ILoginBodyForm } from '@/schemas/LoginFormBody';
import type { IRegisterBodyForm } from '@/schemas/RegisterFormBody';
import { IUserSessionLookupManyMessageBody, UserSessionLookupManyMessageBodySerialize } from '@/schemas/UserSessionLookupData';
import { Serialize } from '@/decorators/serialize.decorator';
import { createLogger } from '@/utils/common';
import type { RequestAuthGuard } from '@/schemas/RequestAuthGuard';

@Controller('auth')
export class AuthController {
  public readonly logger: Logger = createLogger(this);

  private readonly authService: AuthService;
  private readonly userService: UserService;

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  @Post('login')
  @ApiTags('Auth')
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

  @Post('register')
  @ApiTags('Auth')
  @HttpCode(HttpStatusCodes.CREATED)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Register New Account',
    type: AccessJwtTokenMessageBodySerialize,
  })
  @Serialize(AccessJwtTokenMessageBodySerialize)
  async signUp(@Req() req: Request, @Body() body: IRegisterBodyForm): Promise<IAccessJwtTokenMessageBody> {
    return this.authService.authRegister(req, body);
  }

  @Authorize()
  @Post('logout')
  @ApiTags('Auth', 'JWT')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Logout Account',
    type: MessageBodySerialize,
  })
  @Serialize(MessageBodySerialize)
  async signOut(@Req() req: RequestAuthGuard): Promise<EmptyMessageBody> {
    return this.authService.authLogout(req);
  }

  @Authorize()
  @Get('refresh-token')
  @ApiTags('Auth', 'JWT')
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
  @Get('sessions')
  @ApiTags('Auth', 'JWT')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'User Session Lookup Many',
    type: UserSessionLookupManyMessageBodySerialize,
  })
  @Serialize(UserSessionLookupManyMessageBodySerialize)
  async getUserSessions(@Req() req: RequestAuthGuard): Promise<IUserSessionLookupManyMessageBody> {
    return this.authService.authUserSessions(req);
  }
}
