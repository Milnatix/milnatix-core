import { AuthRepositoryPortOut } from '@/ports/out/auth-repository.port';
import { Result } from '@/shared/types/Result.type';
import {
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';
import { apiClient, ApiException } from '@milnatix-core/http-client';

export class HttpAuthRepositoryAdapter implements AuthRepositoryPortOut {
  private readonly basePath = '/accounts/auth';

  public async signIn(
    data: AuthSignInRequestDTO,
  ): Promise<Result<AuthSignInResponseDTO, Error>> {
    try {
      const response = await apiClient.request<AuthSignInResponseDTO>({
        method: 'POST',
        url: `${this.basePath}/sign-in`,
        body: data,
      });

      return Result.ok(response.data);
    } catch (error) {
      if (error instanceof ApiException) {
        return Result.err(new Error(error.message));
      }
      throw error;
    }
  }

}
