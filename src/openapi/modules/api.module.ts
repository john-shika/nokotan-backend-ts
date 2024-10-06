import { Module } from '@nestjs/common';
import { ApiController } from '@/openapi/controllers/api.controller';
import { ApiService } from '@/openapi/services/api.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
