import { ListProductsPortIn } from "@/ports/in/products/list.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { Result } from "@/shared/types/Result.type";
import { ListProductResponseDTO } from "@milnatix-core/dtos";

export class ListProductsUseCase implements ListProductsPortIn {
  constructor(
    private readonly productRepository: ProductsRepositoryPortOut, 
  ) {}

  public async execute(): Promise<Result<ListProductResponseDTO[], Error>> {
    return await this.productRepository.list()
  }

}