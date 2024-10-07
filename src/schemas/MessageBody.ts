import { getDateISOString } from '@/utils/common';
import HttpStatusCodes, { getHttpStatusText, HttpMessageBody, HttpStatusText } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface IMessageBody<T extends any> {
  status: HttpStatusText;
  status_ok: boolean;
  status_code: HttpStatusCodes;
  timestamp: string;
  message: string;
  data?: T;
}

export function setStatusMessage<T extends any>(messageBody: IMessageBody<T>, code: HttpStatusCodes) {
  messageBody.status = getHttpStatusText(code);
  messageBody.status_code = code;
  messageBody.status_ok = 200 <= code && code < 300;
}

export class MessageBody<T extends any> implements IMessageBody<T> {
  status: HttpStatusText;
  status_ok: boolean;
  status_code: HttpStatusCodes;
  timestamp: string;
  message: string;
  data?: T;

  constructor(code: HttpStatusCodes, message: string) {
    setStatusMessage(this, code);
    this.timestamp = getDateISOString();
    this.message = message;
  }

  setData(data: any): this {
    this.data = data;
    return this;
  }
}

export class MessageBodySerialize<T extends any> implements HttpMessageBody<T> {
  @ApiProperty()
  @Expose({ name: 'status' })
  status: HttpStatusText;

  @ApiProperty()
  @Expose({ name: 'status_ok' })
  statusOk: boolean;

  @ApiProperty()
  @Expose({ name: 'status_code' })
  statusCode: HttpStatusCodes;

  @ApiProperty()
  @Expose({ name: 'timestamp' })
  timestamp: string;

  @ApiProperty()
  @Expose({ name: 'message' })
  message: string;

  @ApiProperty()
  @Expose({ name: 'data' })
  data?: T;
}

export default MessageBody;
