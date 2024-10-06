import { MessageBody } from '@/schemas/MessageBody';
import HttpStatusCodes, { HttpStatusText, setStatusMessage } from '@/utils/net/http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): MessageBody<Record<string, any>> {
    const messageBody = new MessageBody(HttpStatusCodes.OK, 'Successfully retrieved message');
    return messageBody.setData({
      message: 'Hello World!',
    });
  }
}
