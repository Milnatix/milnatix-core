import { HashPortOut } from '@/modules/shared/ports/out/hash.port';
import * as bcrypt from 'bcrypt';

export class BcryptHashAdapter implements HashPortOut {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
