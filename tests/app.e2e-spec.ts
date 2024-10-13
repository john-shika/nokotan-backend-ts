import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/modules/app.module';
import { HttpStatusCode } from '@/utils/net/http';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useLogger(false);
    await app.init();
  });

  it('/message (GET)', async () => {
    return request(app.getHttpServer()).get('/message').expect(HttpStatusCode.OK);
  });
});
