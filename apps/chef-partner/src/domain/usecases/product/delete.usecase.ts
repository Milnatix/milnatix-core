import { DeleteProductsPortIn } from '@/ports/in/products/delete.port';
import { ProductsRepositoryPortOut } from '@/ports/out/product-repository.port';
import { Result } from '@/shared/types/Result.type';

export class DeleteProductUseCase implements DeleteProductsPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut) {}

  public async execute(productId: string): Promise<Result<void, Error>> {
    return await this.productRepository.delete(productId);
  }
}
