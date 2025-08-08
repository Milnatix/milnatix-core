import { TokenPayloadInput } from '@/modules/accounts/types/token-payload-input.type';
import { TokenPayloadOutput } from '@/modules/accounts/types/token-payload-output.type';

export const TOKEN_PORT_TOKEN = Symbol('TokenPortOut');

export interface TokenPortOut {
  generateAccessToken(payload: TokenPayloadInput): string;
  generateRefreshToken(payload: TokenPayloadInput): string;
  verifyAccessToken(token: string): TokenPayloadOutput;
  verifyRefreshToken(token: string): TokenPayloadOutput;
}
