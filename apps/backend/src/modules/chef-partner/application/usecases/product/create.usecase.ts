import { ProductMapper } from '@/modules/chef-partner/application/mappers/product.mapper';
import { CreateProductPortIn } from '@/modules/chef-partner/ports/in/product/create.port';
import {
  PRODUCT_REPOSITORY_PORT_TOKEN,
  ProductRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/product-repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInputDTO } from '../../dtos/product/create.input.dto';
import { CreateProductResponseDTO } from '@milnatix-core/dtos';

@Injectable()
export class CreateProductUseCase implements CreateProductPortIn {
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT_TOKEN)
    private readonly productRepository: ProductRepositoryPortOut,
  ) {}

  public async execute(
    productDTO: CreateProductInputDTO,
  ): Promise<CreateProductResponseDTO> {
    const product = ProductMapper.createInputDTOToEntity(productDTO);
    await this.productRepository.create(product);
    return ProductMapper.entityToCreateResponseDTO(product);
  }
}
