import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { MessageBody } from '@/schemas/MessageBody';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator';

@Controller()
export class AppController {
  private readonly appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Public()
  @Get('/message')
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: 200,
    description: 'Get hello message',
    type: MessageBody,
  })
  async getHello(): Promise<MessageBody> {
    return this.appService.getHello()
  }
}
