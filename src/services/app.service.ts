import { EmptyMessageBody } from '@/schemas/MessageBody';
import HttpStatusCode from '@/utils/net/http';
import { Injectable, Logger } from '@nestjs/common';
import { createLogger } from '@/utils/common';

@Injectable()
export class AppService {
  public readonly logger: Logger = createLogger(this);

  getMessage(): EmptyMessageBody {
    return new EmptyMessageBody(HttpStatusCode.OK, 'Hello, World!');
  }
}
