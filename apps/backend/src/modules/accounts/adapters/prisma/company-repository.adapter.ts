import { Injectable } from '@nestjs/common';
import { CompanyRepositoryPortOut } from '../../ports/out/company-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaCompanyRepositoryAdapter
  implements CompanyRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.CompanyUncheckedCreateInput & { id: string },
  ): CompanyEntity {
    return new CompanyEntity({
      id: record.id,
      corporateName: record.corporateName,
      federalDocument: record.federalDocument || null,
      tradingName: record.tradingName,
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

  public async create(entity: CompanyEntity): Promise<CompanyEntity> {
    const record = await this.prisma.company.create({ data: entity });
    return this.mapRecordToEntity(record);
  }

  public async update(
    id: string,
    entity: CompanyEntity,
  ): Promise<CompanyEntity | null> {
    try {
      const record = await this.prisma.company.update({
        where: { id },
        data: entity,
      });
      return this.mapRecordToEntity(record);
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return null;
      }
      throw err;
    }
  }

  public list(where?: Partial<CompanyEntity>): Promise<CompanyEntity[]> {
    const companies = this.prisma.company.findMany({
      where: { ...where, deletedAt: null },
    });

    return companies.then((companies) =>
      companies.map((company) => this.mapRecordToEntity(company)),
    );
  }

  public async findOne(
    where: Partial<CompanyEntity>,
  ): Promise<CompanyEntity | null> {
    const company = await this.prisma.company.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!company) {
      return null;
    }
    return this.mapRecordToEntity(company);
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.company.delete({ where: { id } });
  }
}
