import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { CustomerAddressEntity } from '../../domain/entities/customer-address.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomerAddressRepositoryPortOut } from '../../ports/out/customer-address-repository.port';

@Injectable()
export class PrismaCustomerAddressRepositoryAdapter
  implements CustomerAddressRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.ChefPartnerCustomerAddressUncheckedCreateInput & {
      id: string;
    },
  ): CustomerAddressEntity {
    return new CustomerAddressEntity({
      id: record.id,
      city: record.city,
      complement: record.complement || null,
      customerId: record.customerId,
      neighborhood: record.neighborhood,
      number: record.number || null,
      state: record.state,
      street: record.street,
      zipCode: record.zipCode || null,
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
    customer: CustomerAddressEntity,
  ): Promise<CustomerAddressEntity> {
    const created = await this.prisma.chefPartnerCustomerAddress.create({
      data: customer,
    });
    return this.mapRecordToEntity(created);
  }

  public async update(
    id: string,
    entity: CustomerAddressEntity,
  ): Promise<CustomerAddressEntity> {
    const updated = await this.prisma.chefPartnerCustomerAddress.update({
      where: { id },
      data: entity,
    });
    return this.mapRecordToEntity(updated);
  }

  public async list(
    where?: Partial<CustomerAddressEntity>,
  ): Promise<CustomerAddressEntity[]> {
    const records = await this.prisma.chefPartnerCustomerAddress.findMany({
      where: { ...where, deletedAt: null },
    });
    return records.map((record) => this.mapRecordToEntity(record));
  }

  public async findOne(
    where: Partial<CustomerAddressEntity>,
  ): Promise<CustomerAddressEntity | null> {
    const record = await this.prisma.chefPartnerCustomerAddress.findFirst({
      where: { ...where, deletedAt: null },
    });
    return record ? this.mapRecordToEntity(record) : null;
  }

  public async logicalDelete(
    id: string,
  ): Promise<CustomerAddressEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.chefPartnerCustomerAddress.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    );

    return deleted ? this.mapRecordToEntity(deleted) : null;
  }

  public async trueDelete(id: string): Promise<CustomerAddressEntity | null> {
    const deleted = await this.prisma.executePrismaUpdate(() =>
      this.prisma.chefPartnerCustomerAddress.delete({
        where: { id },
      }),
    );

    return deleted ? this.mapRecordToEntity(deleted) : null;
  }
}
