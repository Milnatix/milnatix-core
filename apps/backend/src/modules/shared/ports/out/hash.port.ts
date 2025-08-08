export const HASH_PORT_OUT_TOKEN = Symbol('HashPortOut');

export interface HashPortOut {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}
