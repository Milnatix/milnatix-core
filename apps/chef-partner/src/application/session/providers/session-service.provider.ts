import { SessionService } from '@/adapters/cookies/session-service.adapter';
import { HttpAuthRepositoryAdapter } from '@/adapters/http/auth-repository.adapter';
import { JoseCryptAdapter } from '@/adapters/jose/crypt.adapter';
import { JWTTokenAdapter } from '@/adapters/jwt/token.adapter';
import { SessionServicePortOut } from '@/ports/out/session.port';

export class SessionServiceProvider {
  private static instance?: SessionServicePortOut;

  public static getInstance(): SessionServicePortOut {
    if (!this.instance) {
      this.instance = new SessionService(
        new JoseCryptAdapter(),
        new JWTTokenAdapter(),
        new HttpAuthRepositoryAdapter(),
      );
    }
    return this.instance;
  }
}
