import { ListProductsPortIn } from "@/ports/in/products/list.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product.port";
import { SessionServicePortOut } from "@/ports/out/session.port";
import { AuthenticatedRequestParams } from "@/shared/types/authenticated-request-params.type";
import { Result } from "@/shared/types/Result.type";
import { ListProductResponseDTO } from "@milnatix-core/dtos";

export class ListProductsUseCase implements ListProductsPortIn {
  constructor(
    private readonly productRepository: ProductsRepositoryPortOut, 
    private readonly sessionService: SessionServicePortOut
  ) {}

  public async execute(): Promise<Result<ListProductResponseDTO[], Error>> {
    const session = await this.sessionService.getSession()
    return await this.productRepository.list({ accessToken: session.accessToken, companyId: session.companies[0].id })
  }

}