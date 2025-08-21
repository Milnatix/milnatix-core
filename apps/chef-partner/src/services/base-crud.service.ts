import { Result } from '@/shared/types/Result.type';
import { apiClient, ApiException } from '@milnatix-core/http-client';
import { HttpRequest } from '@milnatix-core/http-client/dist/ports/http-client.port';

export abstract class BaseCrudService<
  CreateReqDTO,
  UpdateReqDTO,
  SummaryResDTO,
  DetailResDTO,
  ListResDTO,
> {
  constructor(private readonly baseUrl: string) {}

  protected async request<T>(
    config: HttpRequest & { headers?: Record<string, string> },
  ): Promise<Result<T, { message: string; status?: number }>> {
    try {
      const response = await apiClient.request<T>(config);
      return Result.ok(response.data);
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err({
          message: error.message,
          status: error.status,
        });
      }
      throw error;
    }
  }

  public create(
    data: CreateReqDTO,
  ): Promise<Result<SummaryResDTO, { message: string; status?: number }>> {
    return this.request<SummaryResDTO>({
      method: 'POST',
      url: this.baseUrl,
      body: data,
    });
  }

  public getDetails(
    id: string,
  ): Promise<Result<DetailResDTO, { message: string; status?: number }>> {
    return this.request<DetailResDTO>({
      method: 'GET',
      url: `${this.baseUrl}/${id}`,
    });
  }

  public list(): Promise<
    Result<ListResDTO[], { message: string; status?: number }>
  > {
    return this.request<ListResDTO[]>({
      method: 'GET',
      url: this.baseUrl,
    });
  }

  public update(
    id: string,
    data: UpdateReqDTO,
  ): Promise<Result<SummaryResDTO, { message: string; status?: number }>> {
    return this.request<SummaryResDTO>({
      method: 'PATCH',
      url: `${this.baseUrl}/${id}`,
      body: data,
    });
  }

  public delete(
    id: string,
  ): Promise<Result<void, { message: string; status?: number }>> {
    return this.request<void>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
    });
  }
}
