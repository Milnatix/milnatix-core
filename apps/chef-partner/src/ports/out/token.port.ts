export interface TokenPortOut {
  isExpired(token: string): boolean;
}
