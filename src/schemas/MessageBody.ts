import { getDateISOString } from '@/utils/common';
import HttpStatusCode, { HttpStatusText } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface IMessageStatus {
  status: HttpStatusText;
  statusCode: HttpStatusCode;
  statusOk: boolean;
}

export interface IMessageBody<T extends any> extends IMessageStatus {
  message: string;
  timestamp: string;
  data?: T;
}

export function setStatusMessage(messageBody: IMessageStatus, code: HttpStatusCode) {
  messageBody.statusOk = 200 <= code && code < 300;
  messageBody.statusCode = code;
  messageBody.status = HttpStatusText.fromCode(code);
}

export class MessageBody<T extends any> implements IMessageBody<T> {
  statusOk: boolean;
  statusCode: HttpStatusCode;
  status: string;
  message: string;
  timestamp: string;
  data?: T;

  constructor(code: HttpStatusCode, message: string) {
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

export class MessageBodySerialize<T extends any> implements IMessageBody<T> {
  @ApiProperty()
  @Expose({ name: 'statusOk' })
  statusOk: boolean;

  @ApiProperty()
  @Expose({ name: 'statusCode' })
  statusCode: HttpStatusCode;

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
