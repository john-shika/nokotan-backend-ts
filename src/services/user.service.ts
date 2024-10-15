import * as uuid from 'uuid';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import {
  createLogger,
  DateTime,
  getAttrToString,
  getDateISOString,
  getDateToday,
  isNoneOrEmptyWhiteSpace,
  Nullable,
} from '@/utils/common';
import type { User, Users } from '@/models/User';
import type { ILoginBodyForm } from '@/schemas/LoginFormBody';
import type { IRegisterBodyForm } from '@/schemas/RegisterFormBody';

@Injectable()
export class UserService {
  public readonly logger: Logger = createLogger(this);

  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async userPassEquals(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }

  async userByLoginBodyForm(body: ILoginBodyForm): Promise<Nullable<User>> {
    const username = getAttrToString(body, 'username');
    const password = getAttrToString(body, 'password');
    const email = getAttrToString(body, 'email');
    const phone = getAttrToString(body, 'phone');

    let user: User;
    if (username) {
      user = await this.userByUserName(username);
    } else if (email) {
      user = await this.userByEmail(email);
    } else if (phone) {
      user = await this.userByPhone(phone);
    } else {
      return null;
    }

    const check = user && (await this.userPassEquals(user, password));
    return check ? user : null;
  }

  async userByRegisterBodyForm(body: IRegisterBodyForm): Promise<Nullable<User>> {
    const fullname = getAttrToString(body, 'fullname');
    const username = getAttrToString(body, 'username');
    const password = getAttrToString(body, 'password');
    const email = getAttrToString(body, 'email');
    const phone = getAttrToString(body, 'phone');

    if (isNoneOrEmptyWhiteSpace(fullname)) {
      throw new BadRequestException("Fullname can't be empty");
    }

    if (isNoneOrEmptyWhiteSpace(username)) {
      throw new BadRequestException("Username can't be empty");
    }

    if (isNoneOrEmptyWhiteSpace(password)) {
      throw new BadRequestException("Password can't be empty");
    }

    return await this.createUser({
      uuid: uuid.v7(),
      fullname,
      username,
      password,
      email,
      phone,
      admin: false,
      created_at: DateTime.getUtcNow(),
      updated_at: DateTime.getUtcNow(),
      deleted_at: null,
    });
  }

  async userById(id: number): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async userByUserName(username: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          username,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async userByEmail(email: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          email,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async userByPhone(phone: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          phone,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async removeUserById(id: number): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: {
        id,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  async removeUserByUserName(username: string): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: {
        username,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  async removeUserByEmail(email: string): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: {
        email,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  async removeUserByPhone(phone: string): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: {
        phone,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  // low profile without checking column `deleted_at` at first time

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<Nullable<User>> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async userSessionsPreload(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<Nullable<User>> {
    const today = getDateToday();
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        sessions: {
          where: {
            updated_at: {
              gte: today,
            },
            deleted_at: null,
          },
          orderBy: { created_at: 'desc' },
        },
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Users> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
