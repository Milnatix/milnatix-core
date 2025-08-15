import { TokenPortOut } from '@/ports/out/token.port';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

export class JWTTokenAdapter implements TokenPortOut {
  public isExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      ('');
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch (error) {
      return true;
    }
  }
}
