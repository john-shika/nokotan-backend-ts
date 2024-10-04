import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard, UserJwtToken } from '@/services/auth-guard.service';
import { AuthService } from '@/services/auth.service';
import { Public } from '@/decorators/public.decorator';
import { User, UsersService } from '@/services/users.service';
import { Nullable } from '@/utils/index'; 

export interface SignInData extends Record<string, any> {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;
  private readonly usersService: UsersService;

  constructor(authService: AuthService, usersService: UsersService) {
    this.authService = authService;
    this.usersService = usersService;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: SignInData): Promise<any> {
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request : Request): Promise<any> {
    const userJwtToken = request?.["user"] as Nullable<UserJwtToken>;
    return this.usersService.findOne(userJwtToken.username);
  }
}