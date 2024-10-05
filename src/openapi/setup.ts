import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';

export function init(app: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>) {
  const config = new DocumentBuilder()
    .setTitle('Nokotan Backend Api')
    .setDescription('A Nokotan Backend Api Documentation')
    .setVersion('1.0')
    .build();

  const swagDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swagDoc);
}

export default init;
