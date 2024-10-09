import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { createLogger, getAttrToString, getDateISOString, getDateToday, Nullable } from '@/utils/common';
import { User, Users } from '@/models/User';
import { ILoginBodyForm } from '@/schemas/LoginFormBody';

@Injectable()
export class UsersService {
  public readonly logger: Logger = createLogger(this);

  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async userPassEquals(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }

  async authLogin(body: ILoginBodyForm): Promise<Nullable<User>> {
    const username = getAttrToString(body, 'username');
    const password = getAttrToString(body, 'password');
    const email = getAttrToString(body, 'email');
    const phone = getAttrToString(body, 'phone');

    let user: User;
    if (username) {
      user = await this.findOneByUserName(username);
    } else if (email) {
      user = await this.findOneByEmail(email);
    } else if (phone) {
      user = await this.findOneByPhone(phone);
    } else {
      return null;
    }

    const check = user && (await this.userPassEquals(user, password));
    return check ? user : null;
  }

  async findOneById(id: number): Promise<Nullable<User>> {
    return (
      (await this.prisma.users.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserName(username: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.users.findFirst({
        where: {
          username,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByEmail(email: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.users.findFirst({
        where: {
          email,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByPhone(phone: string): Promise<Nullable<User>> {
    return (
      (await this.prisma.users.findFirst({
        where: {
          phone,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async removeById(id: number): Promise<Nullable<User>> {
    return this.prisma.users.update({
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
    return this.prisma.users.update({
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
    return this.prisma.users.update({
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
    return this.prisma.users.update({
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

  async user(userWhereUniqueInput: Prisma.usersWhereUniqueInput): Promise<Nullable<User>> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async userSessionsPreload(userWhereUniqueInput: Prisma.usersWhereUniqueInput): Promise<Nullable<User>> {
    const today = getDateToday();
    return this.prisma.users.findUnique({
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
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<Users> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<User> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(params: { where: Prisma.usersWhereUniqueInput; data: Prisma.usersUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<User> {
    return this.prisma.users.delete({
      where,
    });
  }
}
