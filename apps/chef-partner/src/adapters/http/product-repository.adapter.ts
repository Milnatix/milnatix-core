import { ProductsRepositoryPortOut } from '@/ports/out/product-repository.port';
import { SessionPortOut } from '@/ports/out/session-client.port';
import { Result } from '@/shared/types/Result.type';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';
import { apiClient, ApiException } from '@milnatix-core/http-client';
import {
  HttpRequest,
  HttpResponse,
} from '@milnatix-core/http-client/dist/ports/http-client.port';

export class HttpProductRepositoryAdapter implements ProductsRepositoryPortOut {
  private readonly baseUrl = '/chef-partner/product';

  constructor(private readonly sessionService: SessionPortOut) {}

  private async request<T>(
    config: Omit<HttpRequest, 'headers'>,
  ): Promise<Result<T, Error>> {
    try {
      const session = await this.sessionService.getSession();
      const response = await apiClient.request<T>({
        ...config,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'x-company-id': session.companies[0].id,
        },
      });
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
    requestData: CreateProductRequestDTO,
  ): Promise<Result<CreateProductResponseDTO, Error>> {
    return this.request<CreateProductResponseDTO>({
      method: 'POST',
      url: this.baseUrl,
      body: requestData,
    });
  }

  public update(
    productId: string,
    requestData: CreateProductRequestDTO,
  ): Promise<Result<CreateProductResponseDTO, Error>> {
    return this.request<CreateProductResponseDTO>({
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
