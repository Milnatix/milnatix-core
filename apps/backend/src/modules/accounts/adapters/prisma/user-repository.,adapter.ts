import { UserEntity } from '@/modules/accounts/domain/entities/user.entity';
import { UserRepositoryPortOut } from '@/modules/accounts/ports/out/user-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserRepositoryAdapter implements UserRepositoryPortOut {
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.UserUncheckedCreateInput & { id: string },
  ): UserEntity {
    return new UserEntity({
      id: record.id,
      email: record.email,
      password: record.password,
      createdAt:
        typeof record.createdAt === 'string'
          ? new Date(record.createdAt)
          : record.createdAt,
      updatedAt:
        typeof record.updatedAt === 'string'
          ? new Date(record.updatedAt)
          : record.updatedAt,
      deletedAt:
        typeof record.deletedAt === 'string'
          ? new Date(record.deletedAt)
          : record.deletedAt,
    });
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const record = await this.prisma.user.create({
      data: user,
    });

    return this.mapRecordToEntity(record);
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async list(where?: Where<UserEntity>): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { ...where, deletedAt: null },
    });

    return users.map((user) => this.mapRecordToEntity(user));
  }

  public async update(
    id: string,
    user: UserEntity,
  ): Promise<UserEntity | null> {
    try {
      const record = await this.prisma.user.update({
        where: { id },
        data: {
          email: user.email,
          password: user.password,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt,
        },
      });
      return this.mapRecordToEntity(record);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  public async findOne(where: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!user) {
      return null;
    }
    return this.mapRecordToEntity(user);
  }
}
