import { Injectable } from '@nestjs/common';
import { UserCompanySuiteEntity } from '../../domain/entities/user-company-suite.entity';
import { UserCompanySuiteRepositoryPortOut } from '../../ports/out/user-company-suite-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserCompanySuiteRepositoryAdapter
  implements UserCompanySuiteRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.UserCompanySuiteUncheckedCreateInput & { id: string },
  ): UserCompanySuiteEntity {
    return new UserCompanySuiteEntity({
      id: record.id,
      userId: record.userId,
      companyId: record.companyId || null,
      suiteId: record.suiteId,
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

  public async create(
    userCompanySuite: UserCompanySuiteEntity,
  ): Promise<UserCompanySuiteEntity> {
    const record = await this.prisma.userCompanySuite.create({
      data: userCompanySuite,
    });
    return this.mapRecordToEntity(record);
  }

  public async list(
    where?: Where<UserCompanySuiteEntity>,
  ): Promise<UserCompanySuiteEntity[]> {
    const userCompanySuites = await this.prisma.userCompanySuite.findMany({
      where: { ...where, deletedAt: null },
    });
    return userCompanySuites.map((userCompanySuite) =>
      this.mapRecordToEntity(userCompanySuite),
    );
  }

  public async logicalDelete(
    id: string,
  ): Promise<UserCompanySuiteEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.userCompanySuite.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async trueDelete(id: string): Promise<UserCompanySuiteEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.userCompanySuite.delete({ where: { id } }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async update(
    id: string,
    entity: UserCompanySuiteEntity,
  ): Promise<UserCompanySuiteEntity> {
    const record = await this.prisma.userCompanySuite.update({
      where: { id },
      data: entity,
    });
    return this.mapRecordToEntity(record);
  }

  public async findOne(
    where: Partial<UserCompanySuiteEntity>,
  ): Promise<UserCompanySuiteEntity | null> {
    const userCompanySuite = await this.prisma.userCompanySuite.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!userCompanySuite) {
      return null;
    }
    return this.mapRecordToEntity(userCompanySuite);
  }
}
