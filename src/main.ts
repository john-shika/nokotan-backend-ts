import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/',
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
