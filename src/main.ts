import * as path from 'path';
import globalsInit from '@/globals/setup';
import openApiInit from '@/openapi/setup';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/modules/app.module';
import { HttpExceptionFilter } from '@/exceptions/http-exception.filter';
import { jwtConstants } from './globals/constants';
import { Logger } from '@nestjs/common';
import { getName } from './utils/common';

async function bootstrap() {
  globalsInit();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  const logger = new Logger(getName(app));

  openApiInit(app);

  logger.debug(`jwtConstants.secretKey = ${jwtConstants.secretKey}`);

  app.enableCors();

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
