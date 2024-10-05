import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { getDateISOString, Nullable } from '@/utils/common';
import { Session, Sessions } from '@/models/Session';

@Injectable()
export class SessionsService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findOneById(id: number): Promise<Nullable<Session>> {
    return (
      (await this.prisma.session.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserId(userId: number): Promise<Nullable<Session>> {
    return (
      (await this.prisma.session.findFirst({
        where: {
          user_id: userId,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserName(username: string): Promise<Nullable<Session>> {
    return (
      (await this.prisma.session.findFirst({
        where: {
          user: {
            username,
          },
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async removeById(id: number): Promise<Nullable<Session>> {
    return this.prisma.session.update({
      where: {
        id,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  async removeByUserId(userId: number): Promise<Nullable<Prisma.BatchPayload>> {
    return this.prisma.session.updateMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  async removeByUserName(username: string): Promise<Nullable<Prisma.BatchPayload>> {
    return this.prisma.session.updateMany({
      where: {
        user: {
          username,
        },
        deleted_at: null,
      },
      data: {
        deleted_at: getDateISOString(),
      },
    });
  }

  // low profile without checking column `deleted_at` at first time

  async session(userWhereUniqueInput: Prisma.SessionWhereUniqueInput): Promise<Nullable<Session>> {
    return this.prisma.session.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async sessionUserPreload(userWhereUniqueInput: Prisma.SessionWhereUniqueInput): Promise<Nullable<Session>> {
    return this.prisma.session.findUnique({
      where: userWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async sessions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SessionWhereUniqueInput;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput;
  }): Promise<Sessions> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.session.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSession(data: Prisma.SessionCreateInput): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  async updateSession(params: { where: Prisma.SessionWhereUniqueInput; data: Prisma.SessionUpdateInput }): Promise<Session> {
    const { where, data } = params;
    return this.prisma.session.update({
      data,
      where,
    });
  }

  async deleteSession(where: Prisma.SessionWhereUniqueInput): Promise<Session> {
    return this.prisma.session.delete({
      where,
    });
  }
}
