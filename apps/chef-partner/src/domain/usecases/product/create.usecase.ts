import { ProductFormData } from '@/application/products/schemas/form.schema';
import { CreateProductPortIn } from '@/ports/in/products/create.port';
import { ProductsRepositoryPortOut } from '@/ports/out/product-repository.port';
import { Result } from '@/shared/types/Result.type';
import { FormProductResponseDTO } from '@milnatix-core/dtos';

export class CreateProductUseCase implements CreateProductPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut) {}

  public async execute(
    input: ProductFormData,
  ): Promise<Result<FormProductResponseDTO, Error>> {
    return await this.productRepository.create(input);
  }
}
