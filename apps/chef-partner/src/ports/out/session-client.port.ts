import { AuthSignInResponseDTO } from "@milnatix-core/dtos";

export interface SessionPortOut {
  getSession(): Promise<AuthSignInResponseDTO>;
  setSession(session: AuthSignInResponseDTO): Promise<void>;
}