import { CryptPortOut } from '@/ports/out/crypt.port';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

interface PayloadWithData<T> extends JWTPayload {
  data: T;
}

export class JoseCryptAdapter<T> implements CryptPortOut<T> {
  private readonly secretKey = 'SESSION_SECRET';
  private readonly encodedKey = new TextEncoder().encode(this.secretKey);

  public async encrypt(data: T): Promise<string> {
    return new SignJWT({ data })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.encodedKey);
  }

  public async decrypt(token: string): Promise<T> {
    const { payload } = await jwtVerify(token, this.encodedKey, {
      algorithms: ['HS256'],
    });

    if (!('data' in payload)) {
      throw new Error('Invalid token payload: missing data property');
    }

    return (payload as PayloadWithData<T>).data;
  }
}
