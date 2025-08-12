import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  AuthRefreshTokenRequestDTO,
  AuthRefreshTokenResponseDTO,
} from '@milnatix-core/dtos';

export const REFRESH_TOKEN_PORT_IN_TOKEN = Symbol('RefreshTokenPortIn');

export type RefreshTokenPortIn = BaseUseCasePortIn<
  AuthRefreshTokenRequestDTO,
  AuthRefreshTokenResponseDTO
>;
