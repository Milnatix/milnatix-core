export interface CryptPortOut<T> {
  encrypt(data: T): Promise<string>;
  decrypt(token: string): Promise<T>;
}
