import { getDateISOString } from '@/utils/common';
import HttpStatusCodes, { HttpMessageBody, HttpStatusText } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface IMessageBody<T extends any> {
  status: string;
  status_ok: boolean;
  status_code: HttpStatusCodes;
  message: string;
  timestamp: string;
  data?: T;
}

export function setStatusMessage<T extends any>(messageBody: IMessageBody<T>, code: HttpStatusCodes) {
  messageBody.status_ok = 200 <= code && code < 300;
  messageBody.status_code = code;
  messageBody.status = HttpStatusText.fromCode(code);
}

export class MessageBody<T extends any> implements IMessageBody<T> {
  status_ok: boolean;
  status_code: HttpStatusCodes;
  status: string;
  message: string;
  timestamp: string;
  data?: T;

  constructor(code: HttpStatusCodes, message: string) {
    setStatusMessage(this, code);
    this.message = message;
    this.timestamp = getDateISOString();
  }

  setData(data: any): this {
    this.data = data;
    return this;
  }
}

export class EmptyMessageBody extends MessageBody<object> {
  data = null;
}

export class MessageBodySerialize<T extends any> implements HttpMessageBody<T> {
  @ApiProperty()
  @Expose({ name: 'status_ok' })
  statusOk: boolean;

  @ApiProperty()
  @Expose({ name: 'status_code' })
  statusCode: HttpStatusCodes;

  @ApiProperty()
  @Expose({ name: 'status' })
  status: string;

  @ApiProperty()
  @Expose({ name: 'message' })
  message: string;

  @ApiProperty()
  @Expose({ name: 'timestamp' })
  timestamp: string;

  @ApiProperty()
  @Expose({ name: 'data' })
  data?: T;
}

export class EmptyMessageBodySerialize extends MessageBodySerialize<object> {}

export default MessageBody;
