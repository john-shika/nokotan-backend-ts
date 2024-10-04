import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UsersModule } from '@/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/controllers/auth.controller';
import { jwtConstants } from '@/globals/constants';
import { AuthGuard } from '@/services/auth-guard.service';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from '@/services/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}