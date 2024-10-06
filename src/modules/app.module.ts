import { Module } from '@nestjs/common';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { ApiModule } from '@/openapi/modules/api.module';
import { TestingService } from '@/services/testing.service';

@Module({
  imports: [ApiModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, TestingService.provider()],
})
export class AppModule {}
