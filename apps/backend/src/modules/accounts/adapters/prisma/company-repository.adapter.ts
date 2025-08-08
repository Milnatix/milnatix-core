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

  public update(id: string, entity: CompanyEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public list(where?: Partial<CompanyEntity>): Promise<CompanyEntity[]> {
    throw new Error('Method not implemented.');
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

  public logicalDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public trueDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
