import { TokenPortOut } from '@/modules/accounts/ports/out/token.port';
import { TokenPayloadInput } from '../../types/token-payload-input.type';
import { TokenPayloadOutput } from '../../types/token-payload-output.type';
import { sign, verify } from 'jsonwebtoken';

export class JWTTokenAdapter implements TokenPortOut {
  private readonly accessSecret =
    process.env.JWT_ACCESS_SECRET || 'access-secret-default';
  private readonly refreshSecret =
    process.env.JWT_REFRESH_SECRET || 'refresh-secret-default';

  generateAccessToken(payload: TokenPayloadInput): string {
    return sign(payload, this.accessSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: TokenPayloadInput): string {
    return sign(payload, this.refreshSecret, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): TokenPayloadOutput {
    return verify(token, this.accessSecret) as TokenPayloadOutput;
  }

  verifyRefreshToken(token: string): TokenPayloadOutput {
    return verify(token, this.refreshSecret) as TokenPayloadOutput;
  }
}
