import {
  PaymentMethodEntity,
  PaymentType,
} from '../../domain/entities/payment-method.entity';
import { Where } from '@/modules/shared/types/where.type';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { PaymentMethodRepositoryPortOut } from '../../ports/out/payment-method-repositoy.port';

@Injectable()
export class PrismaPaymentMethodRepositoryAdapter
  implements PaymentMethodRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.FinancialPaymentMethodUncheckedCreateInput & { id: string },
  ): PaymentMethodEntity {
    return new PaymentMethodEntity({
      id: record.id,
      isActive: !!record.isActive,
      name: record.name,
      type: record.type as PaymentType,
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
    entity: PaymentMethodEntity,
  ): Promise<PaymentMethodEntity> {
    const created = await this.prisma.financialPaymentMethod.create({
      data: entity,
    });
    return this.mapRecordToEntity(created);
  }

  update(
    id: string,
    entity: PaymentMethodEntity,
  ): Promise<PaymentMethodEntity> {
    throw new Error('Method not implemented.');
  }

  public async list(
    where?: Where<PaymentMethodEntity>,
  ): Promise<PaymentMethodEntity[]> {
    const records = await this.prisma.financialPaymentMethod.findMany({
      where: { ...where, deletedAt: null },
    });
    return records.map((record) => this.mapRecordToEntity(record));
  }

  findOne(
    where: Where<PaymentMethodEntity>,
  ): Promise<PaymentMethodEntity | null> {
    throw new Error('Method not implemented.');
  }

  logicalDelete(id: string): Promise<PaymentMethodEntity | null> {
    throw new Error('Method not implemented.');
  }

  trueDelete(id: string): Promise<PaymentMethodEntity | null> {
    throw new Error('Method not implemented.');
  }

  public async upsert(paymentMethod: PaymentMethodEntity): Promise<void> {
    await this.prisma.financialPaymentMethod.upsert({
      where: { id: paymentMethod.id },
      update: paymentMethod,
      create: paymentMethod,
    });
  }
}
