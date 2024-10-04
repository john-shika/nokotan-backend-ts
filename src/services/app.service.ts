import { MessageBody } from '@/schemas/MessageBody';
import HttpStatusCodes, { HttpStatusText, setStatusMessage } from '@/utils/net/http.status_codes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): MessageBody {
    const messageBody = new MessageBody(HttpStatusCodes.OK, 'Success');
    return messageBody.setData({
      message: 'Hello World!',
    });
  }
}
