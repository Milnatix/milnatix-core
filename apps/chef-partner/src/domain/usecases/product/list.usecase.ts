import { getSession } from "@/application/facades/session.facade";
import { ListProductsPortIn } from "@/ports/in/products/list.port";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { SessionServicePortOut } from "@/ports/out/session.port";
import { Result } from "@/shared/types/Result.type";
import { ListProductResponseDTO } from "@milnatix-core/dtos";

export class ListProductsUseCase implements ListProductsPortIn {
  constructor(
    private readonly productRepository: ProductsRepositoryPortOut, 
    private readonly sessionService: SessionServicePortOut
  ) {}

  public async execute(): Promise<Result<ListProductResponseDTO[], Error>> {
    const session = await getSession()
    return await this.productRepository.list({ accessToken: session.accessToken, companyId: session.companies[0].id })
  }

}