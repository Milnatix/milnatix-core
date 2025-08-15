import { UpdateProductInputDTO } from "@/application/products/dtos/update.input.dto";
import { UpdateProductPortIn } from "@/ports/in/products/update.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { Result } from "@/shared/types/Result.type";
import { FormProductResponseDTO } from "@milnatix-core/dtos";

export class UpdateProductUseCase implements UpdateProductPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut) {}

  public async execute(input: UpdateProductInputDTO): Promise<Result<FormProductResponseDTO, Error>> {
    return await this.productRepository.update(input.id, input);
  }

}