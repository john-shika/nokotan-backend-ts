import { getDateISOString } from '@/utils/common';
import HttpStatusCodes, { HttpMessageBody, HttpStatusText, setStatusMessage } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';

export class MessageBody<T extends any> implements HttpMessageBody<T> {
  constructor(code: HttpStatusCodes, message: string) {
    setStatusMessage(this, code);
    this.timestamp = getDateISOString();
    this.message = message;
  }

  setData(data: any): this {
    this.data = data;
    return this;
  }

  @ApiProperty()
  status: HttpStatusText;

  @ApiProperty()
  statusOk: boolean;

  @ApiProperty()
  statusCode: HttpStatusCodes;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: T;
}

export default MessageBody;
