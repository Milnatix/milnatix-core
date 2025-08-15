import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { SessionPortOut } from "@/ports/out/session-client.port";
import { Result } from "@/shared/types/Result.type";
import { CreateProductRequestDTO, CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";
import { apiClient, ApiException } from "@milnatix-core/http-client";

export class HttpProductRepositoryAdapter implements ProductsRepositoryPortOut {
  private readonly baseUrl = "/chef-partner/product";

  constructor(private readonly sessionService: SessionPortOut) { }
  
  public async delete(productId: string): Promise<Result<void, Error>> {
    try {
      const session = await this.sessionService.getSession();
      const response = await apiClient.request<void>({
        method: "DELETE",
        url: `${this.baseUrl}/${productId}`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'x-company-id': session.companies[0].id
        },
      })

      return Result.ok(response.data)
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err(new Error(error.message))
      }      

      throw error
    }
  }

  public async list(): Promise<Result<ListProductResponseDTO[], Error>> {
    try {
      
      const session = await this.sessionService.getSession();
      const response = await apiClient.request<ListProductResponseDTO[]>({
        method: "GET",
        url: this.baseUrl,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'x-company-id': session.companies[0].id
        },
      });
  
      return Result.ok(response.data)
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err(new Error(error.message))
      }
      throw error
    }
  }
  public async create(requestData: CreateProductRequestDTO): Promise<Result<CreateProductResponseDTO, Error>> {
    try {
      const session = await this.sessionService.getSession();
      const response = await apiClient.request<CreateProductResponseDTO>({
        method: "POST",
        url: this.baseUrl,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'x-company-id': session.companies[0].id
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