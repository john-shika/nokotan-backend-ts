import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const resJson = await appController.getMessage();
      expect(resJson.data?.message).toBe('Hello, World!');
    });
  });
});
