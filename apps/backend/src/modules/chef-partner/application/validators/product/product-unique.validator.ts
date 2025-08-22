import { ProductEntity } from '@/modules/chef-partner/domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ValidatorPort } from '@/modules/shared/ports/out/validator.port';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductUniqueValidator implements ValidatorPort<ProductEntity> {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async validate(product: ProductEntity): Promise<void> {
    const productWithSameName = await this.productRepository.findOne({
      name: product.name,
      companyId: product.companyId,
      id: { not: product.id },
    });

    if (productWithSameName) {
      throw new ConflictException('Já existe um produto com o mesmo nome');
    }
  }
}
