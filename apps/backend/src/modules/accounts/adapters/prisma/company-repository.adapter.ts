import { Injectable } from '@nestjs/common';
import { CompanyRepositoryPortOut } from '../../ports/out/company-repository.port';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { CompanyEntity } from '../../domain/entities/company.entity';

@Injectable()
export class PrismaCompanyRepositoryAdapter
  implements CompanyRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}
  public async create(entity: CompanyEntity): Promise<void> {
    await this.prisma.company.create({ data: entity });
  }

  public async update(id: string, entity: CompanyEntity): Promise<void> {
    await this.prisma.company.update({
      where: { id },
      data: entity,
    });
  }

  public list(where?: Partial<CompanyEntity>): Promise<CompanyEntity[]> {
    const companies = this.prisma.company.findMany({
      where: { ...where, deletedAt: null },
    });

    return companies.then((companies) =>
      companies.map((company) => new CompanyEntity(company)),
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
    return new CompanyEntity(company);
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
