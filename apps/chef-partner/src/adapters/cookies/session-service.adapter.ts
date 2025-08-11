import { cookies } from 'next/headers'
import { SessionServicePortOut } from "@/ports/out/session.port";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";

export class SessionService implements SessionServicePortOut {

  public async setSession(session: AuthSignInResponseDTO): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(session), { httpOnly: true })
    const cookieSession = cookieStore.get('session');
    console.log('cookie', cookieSession);
  }

  public async getSession(): Promise<AuthSignInResponseDTO> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session');
    console.log('cookieStore', cookieStore);

    if (!cookie?.value) {
      throw new Error('Session not found');
    }

    const session = JSON.parse(cookie.value);
    return session;
  }
}
