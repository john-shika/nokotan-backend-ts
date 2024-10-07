import { MessageBody } from '@/schemas/MessageBody';
import HttpStatusCodes, { HttpStatusText, setStatusMessage } from '@/utils/net/http';
import { Injectable, Logger } from '@nestjs/common';
import { createLogger } from '@/utils/common';

@Injectable()
export class AppService {
  public readonly logger: Logger = createLogger(this);

  getMessage(): MessageBody<Record<string, any>> {
    const messageBody = new MessageBody(HttpStatusCodes.OK, 'Successfully retrieved message');
    return messageBody.setData({
      message: 'Hello World!',
    });
  }
}
