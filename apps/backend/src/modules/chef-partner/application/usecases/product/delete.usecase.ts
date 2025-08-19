import { DeleteProductPortIn } from '@/modules/chef-partner/ports/in/product/delete.port';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase implements DeleteProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}
  public async execute(input: {
    id: string;
    companyId: string;
  }): Promise<void> {
    const deleted = await this.productRepository.logicalDelete(input.id);
    if (!deleted) {
      throw new NotFoundException('Product not found');
    }
  }
}
