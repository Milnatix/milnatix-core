import { ListProductPortIn } from '@/modules/chef-partner/ports/in/product/list.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import { BaseListUseCase } from '@/modules/shared/application/usecases/base-list.usecase';
import { ProductEntity } from '@/modules/chef-partner/domain/entities/product.entity';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import { Where } from '@/modules/shared/types/where.type';

@Injectable()
export class ListProductUseCase
  extends BaseListUseCase<
    ProductEntity,
    CompanyIdContext,
    ListProductResponseDTO
  >
  implements ListProductPortIn
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {
    super(productRepository);
  }

  protected getWhere(input: {
    companyId: string;
  }): Where<ProductEntity> | undefined {
    return { companyId: input.companyId };
  }

  protected toOutput(entity: ProductEntity): ListProductResponseDTO {
    return ProductMapper.entityToListDTO(entity);
  }
}
