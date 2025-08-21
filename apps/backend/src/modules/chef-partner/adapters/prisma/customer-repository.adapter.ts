import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomerRepositoryPortOut } from '../../ports/out/customer-repository.port';

@Injectable()
export class PrismaCustomerRepositoryAdapter
  implements CustomerRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.ChefPartnerCustomerUncheckedCreateInput & { id: string },
  ): CustomerEntity {
    return new CustomerEntity({
      id: record.id,
      email: record.email || null,
      phone: record.phone || null,
      federalDocument: record.federalDocument || null,
      fullName: record.fullName,
      note: record.note || null,
      companyId: record.companyId,
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

  public async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const created = await this.prisma.chefPartnerCustomer.create({
      data: customer,
    });
    return this.mapRecordToEntity(created);
  }

  public async update(
    id: string,
    entity: CustomerEntity,
  ): Promise<CustomerEntity> {
    const updated = await this.prisma.chefPartnerCustomer.update({
      where: { id, deletedAt: null },
      data: entity,
    });
    return this.mapRecordToEntity(updated);
  }

  public async list(
    where?: Partial<CustomerEntity>,
  ): Promise<CustomerEntity[]> {
    const prismaWhere = this.prisma.toPrismaWhere(where);
    const records = await this.prisma.chefPartnerCustomer.findMany({
      where: { ...prismaWhere, deletedAt: null },
    });
    return records.map((record) => this.mapRecordToEntity(record));
  }

  public async findOne(
    where: Partial<CustomerEntity>,
  ): Promise<CustomerEntity | null> {
    const prismaWhere = this.prisma.toPrismaWhere(where);
    console.log(JSON.stringify(prismaWhere));
    const record = await this.prisma.chefPartnerCustomer.findFirst({
      where: { ...prismaWhere, deletedAt: null },
    });
    return record ? this.mapRecordToEntity(record) : null;
  }

  public async logicalDelete(id: string): Promise<CustomerEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.chefPartnerCustomer.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async trueDelete(id: string): Promise<CustomerEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.chefPartnerCustomer.delete({
        where: { id },
      }),
    );
    return deleted ? this.mapRecordToEntity(deleted) : null;
  }
}
