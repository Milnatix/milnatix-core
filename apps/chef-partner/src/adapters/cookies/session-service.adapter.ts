import { cookies } from 'next/headers'
import { SessionServicePortOut } from "@/ports/out/session.port";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { CryptPortOut } from '@/ports/out/crypt.port';
import { TokenPortOut } from '@/ports/out/token.port';
import { AuthRepositoryPortOut } from '@/ports/out/auth-repository.port';
import { setValueInCookies, getValueFromCookies } from './actions';

export class SessionService implements SessionServicePortOut {

  constructor(
    private readonly crypt: CryptPortOut<AuthSignInResponseDTO>,
    private readonly token: TokenPortOut,
    private readonly authRepository: AuthRepositoryPortOut
  ) {}

  public async setSession(session: AuthSignInResponseDTO): Promise<void> {
    const encryptedSession = await this.crypt.encrypt(session);
    setValueInCookies('session', encryptedSession);
  }

  public async getSession(): Promise<AuthSignInResponseDTO> {
    const encryptedSession = await getValueFromCookies('session');

    if (!encryptedSession) {
      throw new Error('Session not found');
    }

    const session = await this.crypt.decrypt(encryptedSession);
    const tokenExpired = this.token.isExpired(session.accessToken);
    if (tokenExpired) {
      const result = await this.authRepository.refresh({refreshToken: session.refreshToken});
      if (!result.success) {
        throw result.error;
      }
      const refreshedSession = result.value;
      const newSession = {...session, ...refreshedSession};
      console.log('oldSession', session, 'newSession', newSession);
      await this.setSession(newSession);
      return newSession;
    }

    return session;
  }
}
