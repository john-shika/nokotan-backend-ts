import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { UsersModule } from '@/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/controllers/auth.controller';
import { jwtConstants } from '@/globals/constants';
import { AuthGuard } from '@/services/auth-guard.service';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { SessionService } from '@/services/session.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService, UserService, SessionService, AuthGuard.provider()],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
