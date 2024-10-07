import { Controller, Get, Header, HttpCode, Logger } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { MessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import { ApiResponse } from '@nestjs/swagger';
import HttpStatusCodes from '@/utils/net/http';
import { createLogger } from '@/utils/common';
import { Serialize } from '@/decorators/serialize.decorator';

@Controller()
export class AppController {
  public readonly logger: Logger = createLogger(this);

  private readonly appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get('/message')
  @HttpCode(HttpStatusCodes.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Get hello message',
    type: MessageBodySerialize,
  })
  @Serialize(MessageBodySerialize)
  async getMessage(): Promise<MessageBody<Record<string, any>>> {
    return this.appService.getMessage();
  }
}
