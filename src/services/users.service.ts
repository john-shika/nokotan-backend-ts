import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { getDateISOString, Nullable } from '@/utils/common';
import { User, Users } from '@/models/User';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async authUserPassEquals(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }

  async authUserPass(username: string, password: string): Promise<Nullable<User>> {
    const user = await this.findOneByUserName(username);
    const check = user && (await this.authUserPassEquals(user, password));
    return check ? user : null;
  }

  async findOneById(id: number): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserName(username: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          username,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByEmail(email: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          email,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByPhone(phone: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.user.findFirst({
        where: {
          phone,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async removeById(id: number): Promise<Nullable<User>> {
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

  async removeByUserName(username: string): Promise<Nullable<User>> {
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

  async removeByEmail(email: string): Promise<Nullable<User>> {
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

  async removeByPhone(phone: string): Promise<Nullable<User>> {
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
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        sessions: true,
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
