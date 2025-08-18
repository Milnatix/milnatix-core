import { AuthRefreshInputRequestDTO } from '@/modules/accounts/application/dtos/auth/auth-refresh-input.request.dto';
import { AuthRefreshInputResponseDTO } from '@/modules/accounts/application/dtos/auth/auth-refresh-input.response.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const REFRESH_TOKEN_PORT_IN_TOKEN = Symbol('RefreshTokenPortIn');

export type RefreshTokenPortIn = BaseUseCasePortIn<
  AuthRefreshInputRequestDTO,
  AuthRefreshInputResponseDTO
>;
