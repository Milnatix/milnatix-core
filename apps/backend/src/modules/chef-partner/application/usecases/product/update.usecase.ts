import { UpdateProductPortIn } from '@/modules/chef-partner/ports/in/product/update.port';
import { FormProductResponseDTO } from '@milnatix-core/dtos';
import { UpdateProductInputDTO } from '../../dtos/product/update.input.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';

@Injectable()
export class UpdateProductUseCase implements UpdateProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    productReq: UpdateProductInputDTO,
  ): Promise<FormProductResponseDTO> {
    const product = ProductMapper.updateProductInputDTOToEntity(productReq);
    const productUpdated = await this.productRepository.update(
      product.id,
      product,
    );

    if (!productUpdated) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return ProductMapper.entityToFormResponseDTO(product);
  }
}
