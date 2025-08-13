import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { AuthenticatedRequestParams } from "@/shared/types/authenticated-request-params.type";
import { Result } from "@/shared/types/Result.type";
import { CreateProductRequestDTO, CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";
import { apiClient, ApiException } from "@milnatix-core/http-client";

export class HttpProductRepositoryAdapter implements ProductsRepositoryPortOut {
  private readonly baseUrl = "/chef-partner/product";

  public async list({accessToken, companyId}: AuthenticatedRequestParams): Promise<Result<ListProductResponseDTO[], Error>> {
    const response = await apiClient.request<ListProductResponseDTO[]>({
      method: "GET",
      url: this.baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-company-id': companyId
      },
    });

    return Result.ok(response.data)
  }
  public async create(authData: AuthenticatedRequestParams, requestData: CreateProductRequestDTO): Promise<Result<CreateProductResponseDTO, Error>> {
    try {
      const response = await apiClient.request<CreateProductResponseDTO>({
        method: "POST",
        url: this.baseUrl,
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
          'x-company-id': authData.companyId
        },
        body: requestData
      });
  
      return Result.ok(response.data)
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err(new Error(error.message))
      }
      throw error      
    }
  }

}