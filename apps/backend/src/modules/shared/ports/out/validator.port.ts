export interface ValidatorPort<T> {
  validate(input: T): Promise<void>;
}
