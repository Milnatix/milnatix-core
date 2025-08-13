export class ApiException extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly details?: any
  ) {
    super(message);
  }
}