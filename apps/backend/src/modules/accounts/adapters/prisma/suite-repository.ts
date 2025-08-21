import { Injectable } from '@nestjs/common';
import { SuiteEntity } from '../../domain/entities/suite.entity';
import { SuiteRepositoryPortOut } from '../../ports/out/suite-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaSuiteRepositoryAdapter implements SuiteRepositoryPortOut {
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.SuiteUncheckedCreateInput & { id: string },
  ): SuiteEntity {
    return new SuiteEntity({
      id: record.id,
      name: record.name,
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

  public async upsert(suite: SuiteEntity): Promise<void> {
    await this.prisma.suite.upsert({
      where: { id: suite.id },
      update: suite,
      create: suite,
    });
  }

  public async create(suite: SuiteEntity): Promise<SuiteEntity> {
    const record = await this.prisma.suite.create({
      data: suite,
    });
    return this.mapRecordToEntity(record);
  }

  public async list(where?: Where<SuiteEntity>): Promise<SuiteEntity[]> {
    const suites = await this.prisma.suite.findMany({
      where: { ...where, deletedAt: null },
    });
    return suites.map((suite) => this.mapRecordToEntity(suite));
  }

  public async logicalDelete(id: string): Promise<SuiteEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.suite.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async trueDelete(id: string): Promise<SuiteEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.suite.delete({ where: { id } }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async update(id: string, entity: SuiteEntity): Promise<SuiteEntity> {
    const record = await this.prisma.suite.update({
      where: { id },
      data: entity,
    });
    return this.mapRecordToEntity(record);
  }

  public async findOne(
    where: Partial<SuiteEntity>,
  ): Promise<SuiteEntity | null> {
    const suite = await this.prisma.suite.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!suite) {
      return null;
    }

    return this.mapRecordToEntity(suite);
  }
}
