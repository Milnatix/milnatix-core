import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';

export const SIGN_IN_PORT_IN_TOKEN = Symbol('SignInPortIn');

export type SignInPortIn = BaseUseCasePortIn<
  AuthSignInRequestDTO,
  AuthSignInResponseDTO
>;
