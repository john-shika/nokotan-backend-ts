import HttpStatusCodes, { HttpMessageBody, HttpStatusText, setStatusMessage } from "@/utils/net/http.status_codes";
import { ApiProperty } from "@nestjs/swagger";

export class MessageBody implements HttpMessageBody {

  constructor(code: HttpStatusCodes, message: string) {
    setStatusMessage(this, code);
    this.timestamp = new Date().toISOString();
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
  data?: any;
}

export default MessageBody;
