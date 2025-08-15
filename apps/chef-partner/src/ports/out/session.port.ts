import { AuthSignInResponseDTO } from '@milnatix-core/dtos';

export interface SessionServicePortOut {
  setSession(session: AuthSignInResponseDTO): Promise<void>;
  getSession(): Promise<AuthSignInResponseDTO>;
}
