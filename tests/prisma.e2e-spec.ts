import * as uuid from 'uuid';
import { PrismaService } from '@/services/prisma.service';
import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import type { Nullable } from '@/utils/common';
import type { User } from '@/models/User';

describe('PrismaService (e2e)', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    await service.onModuleInit();
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });

  it('/user (CREATE, DELETE)', async () => {
    const userCreateInput: Prisma.UserCreateInput = {
      uuid: uuid.v7(),
      username: 'prisma',
      password: 'prisma',
      email: 'prisma@example.com',
      phone: '1234567890',
      admin: false,
    };

    const user = await (async () => {
      const defineUser: Nullable<User> = await service.user.findFirst({
        where: {
          username: userCreateInput.username,
          email: userCreateInput.email,
          phone: userCreateInput.phone,
        },
      });

      if (!defineUser) {
        const defineNewUser: Nullable<User> = await service.user.create({
          data: userCreateInput,
        });

        expect(defineNewUser).toBeDefined();

        return defineNewUser;
      }

      return defineUser;
    })();

    await (async () => {
      const defineDeleteUser: Nullable<User> = await service.user.delete({
        where: {
          id: user.id,
        },
      });

      expect(defineDeleteUser).toBeDefined();
    })();

    expect(user.username).toBe(userCreateInput.username);
    expect(user.email).toBe(userCreateInput.email);
    expect(user.phone).toBe(userCreateInput.phone);
  });
});
