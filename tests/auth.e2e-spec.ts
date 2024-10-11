import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/modules/app.module';
import { HttpStatusCodes } from '@/utils/net/http';
import type { Nullable } from '@/utils/common';
import type { INestApplication } from '@nestjs/common';
import type { IAccessJwtTokenMessageBody } from '@/schemas/JwtToken';
import type { IUserSessionLookupManyMessageBody } from '@/schemas/UserSessionLookupData';
import type { IUserInfoMessageBody } from '@/schemas/UserInfoData';
import type { IMessageBody } from '@/schemas/MessageBody';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let accessToken: Nullable<string> = null;
  let accessNewToken: Nullable<string> = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useLogger(false);
    await app.init();

    httpServer = app.getHttpServer();
  });

  it('/auth/login (POST)', async () => {
    const dataReqBodyForm = {
      username: 'admin',
      password: 'Admin@1234',
    };
    const response = await request(httpServer).post('/auth/login').send(dataReqBodyForm).expect(HttpStatusCodes.CREATED);

    const dataResBodyJson = response.body as IAccessJwtTokenMessageBody;
    accessToken = dataResBodyJson.data.accessToken;

    expect(accessToken).toBeDefined();
  });

  it('/auth/sessions (GET, ACCESS TOKEN)', async () => {
    const response = await request(httpServer)
      .get('/auth/sessions')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatusCodes.OK);

    const dataResBodyJson = response.body as IUserSessionLookupManyMessageBody;
    const sessions = dataResBodyJson.data;

    expect(sessions.length).toBeGreaterThan(0);
  });

  it('/auth/user (GET, ACCESS TOKEN)', async () => {
    const response = await request(httpServer).get('/auth/user').set('Authorization', `Bearer ${accessToken}`).expect(HttpStatusCodes.OK);

    const dataResBodyJson = response.body as IUserInfoMessageBody;
    const user = dataResBodyJson.data;

    expect(user.username).toBe('admin');
    expect(user.admin).toBeTruthy();
  });

  it('/auth/refresh (GET, ACCESS TOKEN)', async () => {
    const response = await request(httpServer)
      .get('/auth/refresh')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatusCodes.CREATED);

    const dataResBodyJson = response.body as IAccessJwtTokenMessageBody;
    accessNewToken = dataResBodyJson.data.accessToken;

    expect(accessNewToken).not.toBe(accessToken);
  });

  it('/auth/user (GET, NEW ACCESS TOKEN)', async () => {
    const response = await request(httpServer)
      .get('/auth/user')
      .set('Authorization', `Bearer ${accessNewToken}`)
      .expect(HttpStatusCodes.OK);

    const dataResBodyJson = response.body as IUserInfoMessageBody;
    const user = dataResBodyJson.data;

    expect(user.username).toBe('admin');
    expect(user.admin).toBeTruthy();
  });

  it('/auth/user (GET, OLD ACCESS TOKEN)', async () => {
    const response = await request(httpServer)
      .get('/auth/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatusCodes.UNAUTHORIZED);

    const dataResBodyJson = response.body as IMessageBody<any>;
    const statusOk = dataResBodyJson.statusOk;
    const statusCode = dataResBodyJson.statusCode;

    expect(statusOk).toBeFalsy();
    expect(statusCode).toBe(HttpStatusCodes.UNAUTHORIZED);
  });

  it('/auth/logout (GET, NEW ACCESS TOKEN)', async () => {
    const response = await request(httpServer)
      .get('/auth/logout')
      .set('Authorization', `Bearer ${accessNewToken}`)
      .expect(HttpStatusCodes.OK);

    const dataResBodyJson = response.body as IMessageBody<any>;
    const message = dataResBodyJson.message;

    expect(message).toBe('Logged out successfully');
  });
});
