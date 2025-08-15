import { GetProductDetailsPortIn } from '@/modules/chef-partner/ports/in/product/get-details.port';
import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';
import { GetProductDetailsInputDTO } from '../../dtos/product/get-details.input.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';

@Injectable()
export class GetProductDetailsUseCase implements GetProductDetailsPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    input: GetProductDetailsInputDTO,
  ): Promise<ProductDetailsResponseDTO> {
    const product = await this.productRepository.findOne({
      id: input.productId,
      companyId: input.companyId,
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return ProductMapper.entityToDetailsDTO(product);
  }
}
