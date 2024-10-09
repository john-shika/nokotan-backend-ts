import * as yaml from 'yaml';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { debugConstants } from '@/globals/constants';
import type { Request, Response } from 'express';

export function init(app: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>) {
  if (debugConstants.testing) {
    const config = new DocumentBuilder()
      .setTitle('Nokotan Backend Api')
      .setDescription('A Nokotan Backend Api Documentation')
      .setVersion('1.0')
      .addBearerAuth({
        name: undefined,
        scheme: 'Bearer',
        bearerFormat: undefined,
        description: `Please enter token in following format: Bearer <JWT>`,
        type: 'http',
        in: undefined,
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('api', app, document, {
    //   jsonDocumentUrl: '/api/v1/openapi.json',
    // });

    const dataJSON = JSON.stringify(document);
    const dataYAML = yaml.stringify(document);

    // Serve the Swagger JSON document at /api/v1/openapi.json
    app.use('/api/v1/openapi.json', (req: Request, res: Response) => {
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Content-Type', 'application/json');
      res.send(dataJSON);
    });

    // Serve the Swagger JSON document at /api/v1/openapi.yaml
    app.use('/api/v1/openapi.yaml', (req: Request, res: Response) => {
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('Content-Type', 'text/yaml');
      res.send(dataYAML);
    });
  }
}

export default init;
