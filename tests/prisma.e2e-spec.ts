import * as uuid from 'uuid';
import { PrismaService } from '@/services/prisma.service';
import { Prisma } from '@prisma/client';
import { createLogger, Nullable } from '@/utils/common';
import { Logger } from '@nestjs/common';
import { User } from '@/models/User';
// import { Test, TestingModule } from '@nestjs/testing';

describe('PrismaService (e2e)', () => {
  let service: PrismaService;
  let logger: Logger;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [PrismaService],
    // }).compile();

    // service = module.get<PrismaService>(PrismaService);

    service = new PrismaService();
    await service.onModuleInit();

    logger = createLogger('PrismaService');
    logger.log('test started');
  });

  afterEach(async () => {
    await service.onModuleDestroy();

    logger.log('test done');
  });

  it('/user (CREATE, DELETE)', async () => {
    const user: Prisma.usersCreateInput = {
      uuid: uuid.v7(),
      username: 'prisma',
      password: 'prisma',
      email: 'prisma@example.com',
      phone: '1234567890',
      admin: false,
    };

    let temp: Nullable<User>;

    await (async () => {
      logger.log('find user if exists');
      const check: Nullable<User> = await service.users.findFirst({
        where: {
          username: user.username,
          email: user.email,
          phone: user.phone,
        },
      });

      temp = check;

      if (!check) {
        logger.log('create new user');

        const data: Nullable<User> = await service.users.create({
          data: user,
        });

        temp = data;
      }
    })();

    await (async () => {
      logger.log('delete current user');

      const user: Nullable<User> = await service.users.delete({
        where: {
          id: temp?.id,
        },
      });

      logger.log(`userId = ${user?.id ?? 0}, found = ${user ? 'yes' : 'no'}`);
    })();

    expect(temp?.username).toBe(user.username);
    expect(temp?.email).toBe(user.email);
    expect(temp?.phone).toBe(user.phone);
  });
});
