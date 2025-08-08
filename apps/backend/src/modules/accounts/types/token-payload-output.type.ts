import { TokenPayloadInput } from './token-payload-input.type';

export interface TokenPayloadOutput extends TokenPayloadInput {
  iat: number;
  exp: number;
}
