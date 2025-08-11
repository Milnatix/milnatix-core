'use server'

import { HttpAuthRepositoryAdapter } from '@/adapters/http/auth-repository.adapter';
import { SignInUseCase } from '@/domain/usecases/auth/sign-in.usecase';
import { SignInPortIn } from '@/ports/in/auth/sign-in.port'
import { AuthPortOut } from '@/ports/out/auth.port';
import { SignInFormData } from '../schemas/auth/sign-in.schema';
import { AuthSignInResponseDTO } from '@milnatix-core/dtos';
import { Result } from '@/shared/types/Result.type';
import { SetSessionPortIn } from '@/ports/in/auth/set-session.port';
import { SetSessionUseCase } from '@/domain/usecases/auth/set-session.usecase';
import { SessionServiceProvider } from '../providers/session-service.provider';

export async function signIn(data: SignInFormData): Promise<Result<AuthSignInResponseDTO, Error>> {
  const authRepository: AuthPortOut = new HttpAuthRepositoryAdapter();
  const signInUseCase: SignInPortIn = new SignInUseCase(authRepository);
  return await signInUseCase.execute(data);
}

export async function setSession(data: AuthSignInResponseDTO): Promise<void> {
  const setSessionUseCase: SetSessionPortIn = new SetSessionUseCase(SessionServiceProvider.getInstance());
  await setSessionUseCase.execute(data);
}