import { Controller, Get, Header, HttpCode, Logger } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { MessageBody } from '@/schemas/MessageBody';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import { createLogger } from '@/utils/common';

@Controller()
export class AppController {
  private readonly logger: Logger;
  private readonly appService: AppService;

  constructor(appService: AppService) {
    this.logger = createLogger(this);
    this.appService = appService;
  }

  @Get('/message')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    status: HttpStatusCodes.OK,
    description: 'Get hello message',
    type: MessageBody,
  })
  async getMessage(): Promise<MessageBody<Record<string, any>>> {
    return this.appService.getMessage();
  }
}
