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

  public async list(where?: Where<UserEntity>): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { ...where, deletedAt: null },
    });

    return users.map((user) => this.mapRecordToEntity(user));
  }

  public async update(
    id: string,
    entity: UserEntity,
  ): Promise<UserEntity | null> {
    const record = await this.prisma.executePrismaUpdate(() =>
      this.prisma.user.update({
        where: { id },
        data: entity,
      }),
    );
    return record ? this.mapRecordToEntity(record) : null;
  }
  public async logicalDelete(id: string): Promise<UserEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async trueDelete(id: string): Promise<UserEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.user.delete({ where: { id } }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
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
