export interface BaseUseCasePortIn<Input, Output> {
  execute(input: Input): Promise<Output>;
}
