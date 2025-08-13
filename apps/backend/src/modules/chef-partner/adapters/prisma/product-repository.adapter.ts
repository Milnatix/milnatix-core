import { PrismaService } from '@/modules/shared/infra/prisma/prisma.service';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepositoryPortOut } from '../../ports/out/product-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepositoryAdapter
  implements ProductRepositoryPortOut
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(product: ProductEntity): Promise<void> {
    await this.prisma.chefPartnerProduct.create({ data: product });
  }

  update(id: string, entity: ProductEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async list(where?: Partial<ProductEntity>): Promise<ProductEntity[]> {
    const products = await this.prisma.chefPartnerProduct.findMany({
      where: { ...where, deletedAt: null },
    });

    return products.map(
      (product) =>
        new ProductEntity({
          id: product.id,
          name: product.name,
          description: product.description,
          salePrice: product.salePrice.toNumber(),
          costPrice: product.costPrice?.toNumber() || null,
          isAvailable: product.isAvailable,
          companyId: product.companyId,
        }),
    );
  }

  public async findOne(
    where: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> {
    const product = await this.prisma.chefPartnerProduct.findFirst({
      where: { ...where, deletedAt: null },
    });
    if (!product) {
      return null;
    }
    return new ProductEntity({
      id: product.id,
      name: product.name,
      description: product.description,
      salePrice: product.salePrice.toNumber(),
      costPrice: product.costPrice?.toNumber() || null,
      isAvailable: product.isAvailable,
      companyId: product.companyId,
    });
  }

  logicalDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  trueDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
