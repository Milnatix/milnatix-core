import { BaseUseCasePortIn } from '../../ports/in/base-usecase.port';
import { BaseRepositoryPortOut } from '../../ports/out/base-repositoy.port';
import { ValidatorPort } from '../../ports/out/validator.port';

export abstract class BaseCreateUseCase<
  Entity extends { id: string },
  Input,
  Output,
> implements BaseUseCasePortIn<Input, Output>
{
  constructor(
    private readonly repository: BaseRepositoryPortOut<Entity>,
    private readonly validators: ValidatorPort<Entity>[],
  ) {}

  public abstract toEntity(input: Input): Entity;

  public abstract toOutput(entity: Entity): Output;

  public async execute(input: Input): Promise<Output> {
    const entity = this.toEntity(input);
    for (const validator of this.validators) {
      await validator.validate(entity);
    }
    const entityCreated = await this.repository.create(entity);
    return this.toOutput(entityCreated);
  }
}
