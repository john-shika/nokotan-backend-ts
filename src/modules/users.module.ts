import { Module } from '@nestjs/common';
import { UsersService } from '@/services/users.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
