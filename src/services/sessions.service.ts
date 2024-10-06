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
      (await this.prisma.sessions.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserId(userId: number): Promise<Nullable<Session>> {
    return (
      (await this.prisma.sessions.findFirst({
        where: {
          user_id: userId,
          deleted_at: null,
        },
      })) ?? null
    );
  }

  async findOneByUserName(username: string): Promise<Nullable<Session>> {
    return (
      (await this.prisma.sessions.findFirst({
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
    return this.prisma.sessions.update({
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
    return this.prisma.sessions.updateMany({
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
    return this.prisma.sessions.updateMany({
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

  async session(userWhereUniqueInput: Prisma.sessionsWhereUniqueInput): Promise<Nullable<Session>> {
    return this.prisma.sessions.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async sessionUserPreload(userWhereUniqueInput: Prisma.sessionsWhereUniqueInput): Promise<Nullable<Session>> {
    return this.prisma.sessions.findUnique({
      where: userWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async sessions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.sessionsWhereUniqueInput;
    where?: Prisma.sessionsWhereInput;
    orderBy?: Prisma.sessionsOrderByWithRelationInput;
  }): Promise<Sessions> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.sessions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSession(data: Prisma.sessionsCreateInput): Promise<Session> {
    return this.prisma.sessions.create({
      data,
    });
  }

  async updateSession(params: { where: Prisma.sessionsWhereUniqueInput; data: Prisma.sessionsUpdateInput }): Promise<Session> {
    const { where, data } = params;
    return this.prisma.sessions.update({
      data,
      where,
    });
  }

  async deleteSession(where: Prisma.sessionsWhereUniqueInput): Promise<Session> {
    return this.prisma.sessions.delete({
      where,
    });
  }
}
