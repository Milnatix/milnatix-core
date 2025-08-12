import { cookies } from 'next/headers'
import { SessionServicePortOut } from "@/ports/out/session.port";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { CryptPortOut } from '@/ports/out/crypt.port';
import { TokenPortOut } from '@/ports/out/token.port';

export class SessionService implements SessionServicePortOut {

  constructor(
    private readonly crypt: CryptPortOut<AuthSignInResponseDTO>,
    private readonly token: TokenPortOut
  ) {}

  public async setSession(session: AuthSignInResponseDTO): Promise<void> {
    const cookieStore = await cookies();
    const encryptedSession = await this.crypt.encrypt(session);
    cookieStore.set('session', encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
  }

  public async getSession(): Promise<AuthSignInResponseDTO> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session');

    if (!cookie?.value) {
      throw new Error('Session not found');
    }

    const session = await this.crypt.decrypt(cookie.value);

    const tokenExpired = await this.token.isExpired(session.accessToken);
    if (tokenExpired) {
      throw new Error('Token expired');
    }

    return session;
  }
}
