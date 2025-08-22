import { UpdateProductPortIn } from '@/modules/chef-partner/ports/in/product/update.port';
import {
  SummaryProductResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';
import { IdContext } from '@/modules/shared/types/id-context.type';
import { ProductEntity } from '@/modules/chef-partner/domain/entities/product.entity';
import { ProductUniqueValidator } from '../../validators/product/product-unique.validator';
import { BaseUpdateUseCase } from '@/modules/shared/application/usecases/base-update.usecase';

@Injectable()
export class UpdateProductUseCase
  extends BaseUpdateUseCase<
    ProductEntity,
    IdContext<UpdateProductRequestDTO>,
    SummaryProductResponseDTO
  >
  implements UpdateProductPortIn
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
    private readonly productUniqueValidator: ProductUniqueValidator,
  ) {
    super(productRepository, [productUniqueValidator]);
  }

  protected getNotFoundMessage(): string {
    return 'Produto nao encontrado';
  }

  protected toEntity(
    input: IdContext<UpdateProductRequestDTO>,
    current: ProductEntity,
  ): ProductEntity {
    return new ProductEntity({
      ...current,
      ...input.payload,
    });
  }

  protected toOutput(entity: ProductEntity): SummaryProductResponseDTO {
    return ProductMapper.entityToFormResponseDTO(entity);
  }
}
