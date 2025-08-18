import { AuthSignInInputResponseDTO } from '@/modules/accounts/application/dtos/auth/auth-sign-in-input.response.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { AuthSignInRequestDTO } from '@milnatix-core/dtos';

export const SIGN_IN_PORT_IN_TOKEN = Symbol('SignInPortIn');

export type SignInPortIn = BaseUseCasePortIn<
  AuthSignInRequestDTO,
  AuthSignInInputResponseDTO
>;
