import { GetProductDetailsPortIn } from '@/modules/chef-partner/ports/in/product/get-details.port';
import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';
import { DetailContext } from '@/modules/shared/types/detail-context.type';

@Injectable()
export class GetProductDetailsUseCase implements GetProductDetailsPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    input: DetailContext,
  ): Promise<ProductDetailsResponseDTO> {
    const product = await this.productRepository.findOne({
      id: input.id,
      companyId: input.companyId,
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return ProductMapper.entityToDetailsDTO(product);
  }
}
