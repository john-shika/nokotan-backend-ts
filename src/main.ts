import * as path from 'path';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { jwtConstants } from './globals/constants';

async function bootstrap() {

  dotenv.config({
    path: path.join(__dirname, '..', '.env'),
  });

  Object.defineProperty(jwtConstants, 'secretKey', {
    value: process.env.JWT_SECRET_KEY,
    enumerable: true,
    configurable: false,
    writable: false,
  })

  console.log(jwtConstants.secretKey);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  const config = new DocumentBuilder()
  .setTitle('Nokotan Api')
  .setDescription('A Nokotan Backend Api Documentation')
  .setVersion('1.0')
  .build();

  const swagDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swagDoc);

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
