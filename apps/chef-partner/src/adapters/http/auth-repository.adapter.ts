import { AuthPortOut } from "@/ports/out/auth.port";
import { Result } from "@/shared/types/Result.type";
import { AuthSignInRequestDTO, AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { apiClient } from "@milnatix-core/http-client";

export class HttpAuthRepositoryAdapter implements AuthPortOut {
  private readonly basePath = '/accounts/auth'

  public async signIn(data: AuthSignInRequestDTO): Promise<Result<AuthSignInResponseDTO, Error>> {
    const response = await apiClient.request<AuthSignInResponseDTO>({
        method: 'POST',
        url: `${this.basePath}/sign-in`,
        body: data
    })
    return Result.ok(response.data)
  }


}