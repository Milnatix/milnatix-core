import { NotFoundException } from '@nestjs/common';
import { BaseUseCasePortIn } from '../../ports/in/base-usecase.port';
import { BaseRepositoryPortOut } from '../../ports/out/base-repositoy.port';
import { ValidatorPort } from '../../ports/out/validator.port';
import { Where } from '../../types/where.type';

export abstract class BaseUpdateUseCase<
  Entity extends { id: string },
  Input extends { id: string },
  Output,
> implements BaseUseCasePortIn<Input, Output>
{
  constructor(
    private readonly repository: BaseRepositoryPortOut<Entity>,
    private readonly validators: ValidatorPort<Entity>[],
  ) {}

  protected abstract getNotFoundMessage(): string;

  protected abstract toEntity(input: Input, current: Entity): Entity;

  protected abstract toOutput(entity: Entity): Output;

  public async execute(input: Input): Promise<Output> {
    const entityDB = await this.repository.findOne({
      id: input.id,
    } as Where<Entity>);

    if (!entityDB) {
      throw new NotFoundException(this.getNotFoundMessage());
    }

    const entityToUpdate = this.toEntity(input, entityDB);

    for (const validator of this.validators) {
      await validator.validate(entityToUpdate);
    }

    const entityUpdated = await this.repository.update(
      input.id,
      entityToUpdate,
    );

    return this.toOutput(entityUpdated);
  }
}
