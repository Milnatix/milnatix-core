import { GetProductDetailsPortIn } from '@/ports/in/products/get-details.port';
import { ProductsRepositoryPortOut } from '@/ports/out/product-repository.port';
import { Result } from '@/shared/types/Result.type';
import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';

export class GetProductDetailsUseCase implements GetProductDetailsPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut) {}

  public async execute(
    productId: string,
  ): Promise<Result<ProductDetailsResponseDTO, Error>> {
    return await this.productRepository.getDetails(productId);
  }
}
