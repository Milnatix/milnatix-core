import { AuthSignInResponseDTO } from '@milnatix-core/dtos';

import { BaseUseCasePortIn } from '../base-usecase.port';
import { SignInFormData } from '@/application/auth/schemas/sign-in.schema';
import { Result } from '@/shared/types/Result.type';

export type SignInPortIn = BaseUseCasePortIn<
  SignInFormData,
  Result<AuthSignInResponseDTO, Error>
>;
