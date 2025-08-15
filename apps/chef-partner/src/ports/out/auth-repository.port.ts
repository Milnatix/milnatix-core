import { Result } from '@/shared/types/Result.type';
import {
  AuthRefreshTokenRequestDTO,
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';

export interface AuthRepositoryPortOut {
  signIn(
    data: AuthSignInRequestDTO,
  ): Promise<Result<AuthSignInResponseDTO, Error>>;
  refresh(
    data: AuthRefreshTokenRequestDTO,
  ): Promise<Result<AuthSignInResponseDTO, Error>>;
}
