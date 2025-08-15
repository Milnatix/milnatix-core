import { ProductFormData } from "@/application/schemas/product/form.schema";
import { CreateProductPortIn } from "@/ports/in/products/create.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { Result } from "@/shared/types/Result.type";
import { CreateProductResponseDTO } from "@milnatix-core/dtos";

export class CreateProductUseCase implements CreateProductPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut) {}

  public async execute(input: ProductFormData): Promise<Result<CreateProductResponseDTO, Error>> {
    return await this.productRepository.create(input);
  }

}