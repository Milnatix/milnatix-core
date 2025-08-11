import { Result } from "@/shared/types/Result.type";
import { AuthSignInRequestDTO, AuthSignInResponseDTO } from "@milnatix-core/dtos";

export interface AuthPortOut {
  signIn(data: AuthSignInRequestDTO): Promise<Result<AuthSignInResponseDTO, Error>>
}