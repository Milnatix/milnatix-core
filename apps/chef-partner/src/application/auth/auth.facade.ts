'use server';

import { HttpAuthRepositoryAdapter } from '@/adapters/http/auth-repository.adapter';
import { SignInUseCase } from '@/domain/usecases/auth/sign-in.usecase';
import { SignInPortIn } from '@/ports/in/auth/sign-in.port';
import { AuthRepositoryPortOut } from '@/ports/out/auth-repository.port';
import { SignInFormData } from './schemas/sign-in.schema';
import { Result } from '@/shared/types/Result.type';
import { AuthSignInResponseDTO } from '@milnatix-core/dtos';

export async function signIn(
  data: SignInFormData,
): Promise<Result<AuthSignInResponseDTO, Error>> {
  const authRepository: AuthRepositoryPortOut = new HttpAuthRepositoryAdapter();
  const signInUseCase: SignInPortIn = new SignInUseCase(authRepository);
  return await signInUseCase.execute(data);
}
