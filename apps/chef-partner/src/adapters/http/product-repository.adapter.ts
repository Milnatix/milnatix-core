import { ProductsRepositoryPortOut } from '@/ports/out/product-repository.port';
import { Result } from '@/shared/types/Result.type';
import {
  FormProductRequestDTO,
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';
import { apiClient, ApiException } from '@milnatix-core/http-client';
import {
  HttpRequest,
} from '@milnatix-core/http-client/dist/ports/http-client.port';

export class HttpProductRepositoryAdapter implements ProductsRepositoryPortOut {
  private readonly baseUrl = '/chef-partner/product';

  private async request<T>(
    config: HttpRequest,
  ): Promise<Result<T, Error>> {
    try {
      const response = await apiClient.request<T>(config);
      return Result.ok(response.data);
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err(new Error(error.message));
      }
      throw error;
    }
  }

  public getDetails(
    productId: string,
  ): Promise<Result<ProductDetailsResponseDTO, Error>> {
    return this.request<ProductDetailsResponseDTO>({
      method: 'GET',
      url: `${this.baseUrl}/${productId}`,
    });
  }

  public list(): Promise<Result<ListProductResponseDTO[], Error>> {
    return this.request<ListProductResponseDTO[]>({
      method: 'GET',
      url: this.baseUrl,
    });
  }

  public create(
    requestData: FormProductRequestDTO,
  ): Promise<Result<FormProductResponseDTO, Error>> {
    return this.request<FormProductResponseDTO>({
      method: 'POST',
      url: this.baseUrl,
      body: requestData,
    });
  }

  public update(
    productId: string,
    requestData: FormProductRequestDTO,
  ): Promise<Result<FormProductResponseDTO, Error>> {
    return this.request<FormProductResponseDTO>({
      method: 'PUT',
      url: `${this.baseUrl}/${productId}`,
      body: requestData,
    });
  }

  public delete(productId: string): Promise<Result<void, Error>> {
    return this.request<void>({
      method: 'DELETE',
      url: `${this.baseUrl}/${productId}`,
    });
  }
}
