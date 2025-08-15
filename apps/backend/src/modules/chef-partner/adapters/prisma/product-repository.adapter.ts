import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepositoryPortOut } from '../../ports/out/product-repository.port';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaProductRepositoryAdapter
  implements ProductRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  private mapRecordToEntity(
    record: Prisma.ChefPartnerProductUncheckedCreateInput & { id: string },
  ): ProductEntity {
    return new ProductEntity({
      id: record.id,
      name: record.name,
      description: record.description || null,
      salePrice: Number(record.salePrice),
      costPrice: Number(record.costPrice) || null,
      isAvailable: Boolean(record.isAvailable),
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

  public async create(product: ProductEntity): Promise<ProductEntity> {
    const created = await this.prisma.chefPartnerProduct.create({
      data: product,
    });
    return this.mapRecordToEntity(created);
  }

  public async update(
    id: string,
    entity: ProductEntity,
  ): Promise<ProductEntity | null> {
    try {
      const updated = await this.prisma.chefPartnerProduct.update({
        where: { id },
        data: entity,
      });
      return this.mapRecordToEntity(updated);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  public async list(where?: Partial<ProductEntity>): Promise<ProductEntity[]> {
    const records = await this.prisma.chefPartnerProduct.findMany({
      where: { ...where, deletedAt: null },
    });
    return records.map((record) => this.mapRecordToEntity(record));
  }

  public async findOne(
    where: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> {
    const record = await this.prisma.chefPartnerProduct.findFirst({
      where: { ...where, deletedAt: null },
    });
    return record ? this.mapRecordToEntity(record) : null;
  }

  public async logicalDelete(id: string): Promise<void> {
    await this.prisma.chefPartnerProduct.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  public async trueDelete(id: string): Promise<void> {
    await this.prisma.chefPartnerProduct.delete({ where: { id } });
  }
}
