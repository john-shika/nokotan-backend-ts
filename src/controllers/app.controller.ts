import { Controller, Get, Header, HttpCode, Logger } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { EmptyMessageBody, EmptyMessageBodySerialize } from '@/schemas/MessageBody';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import HttpStatusCode from '@/utils/net/http';
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
  @ApiTags('App', 'Anonymous')
  @HttpCode(HttpStatusCode.OK)
  @Header('Content-Type', 'application/json')
  @ApiResponse({
    description: 'Get hello message',
    type: EmptyMessageBodySerialize,
  })
  @Serialize(EmptyMessageBodySerialize)
  async getMessage(): Promise<EmptyMessageBody> {
    return this.appService.getMessage();
  }
}
