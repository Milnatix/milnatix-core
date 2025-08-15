import { cookies } from 'next/headers';
import { AuthSignInResponseDTO } from '@milnatix-core/dtos';
import { CryptPortOut } from '@/ports/out/crypt.port';
import { TokenPortOut } from '@/ports/out/token.port';
import { AuthRepositoryPortOut } from '@/ports/out/auth-repository.port';
import { SessionServicePortOut } from '@/ports/out/session.port';

export class SessionService implements SessionServicePortOut {
  constructor(
    private readonly crypt: CryptPortOut<AuthSignInResponseDTO>,
    private readonly token: TokenPortOut,
    private readonly authRepository: AuthRepositoryPortOut,
  ) {}

  public async setSession(session: AuthSignInResponseDTO) {
    const encrypted = await this.crypt.encrypt(session);
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session',
      value: encrypted,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
  }

  public async getSession(): Promise<AuthSignInResponseDTO> {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get('session')?.value;
    if (!encrypted) throw new Error('Sessão não encontrada');

    const session = await this.crypt.decrypt(encrypted);

    if (this.token.isExpired(session.accessToken)) {
      const result = await this.authRepository.refresh({
        refreshToken: session.refreshToken,
      });
      if (!result.success) throw result.error;

      const newSession = { ...session, ...result.value };
      await this.setSession(newSession);
      return newSession;
    }

    return session;
  }
}
