import { UpdateProductPortIn } from '@/modules/chef-partner/ports/in/product/update.port';
import {
  FormProductResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';
import { DetailContext } from '@/modules/shared/types/detail-context.type';

@Injectable()
export class UpdateProductUseCase implements UpdateProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    dto: DetailContext<UpdateProductRequestDTO>,
  ): Promise<FormProductResponseDTO> {
    const productUpdated = await this.productRepository.update(dto.id, {
      ...dto.payload,
    });

    if (!productUpdated) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return ProductMapper.entityToFormResponseDTO(productUpdated);
  }
}
