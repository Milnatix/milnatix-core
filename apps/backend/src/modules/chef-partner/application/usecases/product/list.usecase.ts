import { ListProductPortIn } from '@/modules/chef-partner/ports/in/product/list.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ProductMapper } from '../../mappers/product.mapper';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';

@Injectable()
export class ListProductUseCase implements ListProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    input: CompanyIdContext<void>,
  ): Promise<ListProductResponseDTO[]> {
    const products = await this.productRepository.list({
      companyId: input.companyId,
    });

    return products.map((product) => ProductMapper.entityToListDTO(product));
  }
}
