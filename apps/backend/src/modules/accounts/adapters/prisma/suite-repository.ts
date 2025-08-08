import { Injectable } from '@nestjs/common';
import { SuiteEntity } from '../../domain/entities/suite.entity';
import { SuiteRepositoryPortOut } from '../../ports/out/suite-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { Where } from '@/modules/shared/types/where.type';

@Injectable()
export class PrismaSuiteRepositoryAdapter implements SuiteRepositoryPortOut {
  constructor(private readonly prisma: PrismaService) {}

  public async upsert(suite: SuiteEntity): Promise<void> {
    await this.prisma.suite.upsert({
      where: { id: suite.id },
      update: suite,
      create: suite,
    });
  }

  public async create(suite: SuiteEntity): Promise<void> {
    await this.prisma.suite.create({
      data: suite,
    });
  }

  public async list(where?: Where<SuiteEntity>): Promise<SuiteEntity[]> {
    const suites = await this.prisma.suite.findMany({
      where: { ...where, deletedAt: null },
    });
    return suites.map(
      (suite) =>
        new SuiteEntity({
          id: suite.id,
          name: suite.name,
        }),
    );
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.suite.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.suite.delete({ where: { id } });
  }

  public async update(id: string, suite: SuiteEntity): Promise<void> {
    await this.prisma.suite.update({
      where: { id },
      data: suite,
    });
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
    return new SuiteEntity({
      id: suite.id,
      name: suite.name,
    });
  }
}
