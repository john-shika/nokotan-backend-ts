import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UsersModule } from '@/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/controllers/auth.controller';
import { jwtConstants } from '@/globals/constants';
import { AuthGuard } from '@/services/auth-guard.service';
import { UsersService } from '@/services/users.service';
import { PrismaService } from '@/services/prisma.service';
import { SessionsService } from '@/services/sessions.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService, UsersService, SessionsService, AuthGuard.provider()],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
