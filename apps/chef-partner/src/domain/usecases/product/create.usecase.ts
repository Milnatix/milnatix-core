import { ProductFormData } from "@/application/schemas/product/form.schema";
import { CreateProductPortIn } from "@/ports/in/products/create.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { SessionServicePortOut } from "@/ports/out/session.port";
import { AuthenticatedRequestParams } from "@/shared/types/authenticated-request-params.type";
import { Result } from "@/shared/types/Result.type";
import { CreateProductResponseDTO } from "@milnatix-core/dtos";

export class CreateProductUseCase implements CreateProductPortIn {
  constructor(private readonly productRepository: ProductsRepositoryPortOut, private readonly sessionService: SessionServicePortOut) {}

  public async execute(input: ProductFormData): Promise<Result<CreateProductResponseDTO, Error>> {
    const session = await this.sessionService.getSession();
    const authData: AuthenticatedRequestParams = {
      accessToken: session.accessToken,
      companyId: session.companies[0].id
    }
    const result = await this.productRepository.create(authData, input);
    return result
  }

}