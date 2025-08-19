import { ProductMapper } from '@/modules/chef-partner/application/mappers/product.mapper';
import { CreateProductPortIn } from '@/modules/chef-partner/ports/in/product/create.port';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  FormProductRequestDTO,
  FormProductResponseDTO,
} from '@milnatix-core/dtos';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';

@Injectable()
export class CreateProductUseCase implements CreateProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    productDTO: CompanyIdContext<FormProductRequestDTO>,
  ): Promise<FormProductResponseDTO> {
    const product = ProductMapper.createInputDTOToEntity(productDTO);
    const productWithSameName = await this.productRepository.findOne({
      name: product.name,
      companyId: product.companyId,
    });

    if (productWithSameName) {
      throw new ConflictException('Já existe um produto com o mesmo nome');
    }

    await this.productRepository.create(product);
    return ProductMapper.entityToFormResponseDTO(product);
  }
}
