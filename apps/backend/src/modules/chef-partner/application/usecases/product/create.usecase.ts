import { ProductMapper } from '@/modules/chef-partner/application/mappers/product.mapper';
import { CreateProductPortIn } from '@/modules/chef-partner/ports/in/product/create.port';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  FormProductRequestDTO,
  SummaryProductResponseDTO,
} from '@milnatix-core/dtos';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import { BaseCreateUseCase } from '@/modules/shared/application/usecases/base-create.usecase';
import { ProductEntity } from '@/modules/chef-partner/domain/entities/product.entity';
import { ProductUniqueValidator } from '../../validators/product/product-unique.validator';

@Injectable()
export class CreateProductUseCase
  extends BaseCreateUseCase<
    ProductEntity,
    CompanyIdContext<FormProductRequestDTO>,
    SummaryProductResponseDTO
  >
  implements CreateProductPortIn
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
    private readonly productUniqueValidator: ProductUniqueValidator,
  ) {
    super(productRepository, [productUniqueValidator]);
  }

  public toEntity(
    input: CompanyIdContext<FormProductRequestDTO>,
  ): ProductEntity {
    return ProductMapper.createInputDTOToEntity(input);
  }

  public toOutput(entity: ProductEntity): SummaryProductResponseDTO {
    return ProductMapper.entityToFormResponseDTO(entity);
  }
}
