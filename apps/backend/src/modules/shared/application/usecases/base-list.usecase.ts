import { BaseUseCasePortIn } from '../../ports/in/base-usecase.port';
import { BaseRepositoryPortOut } from '../../ports/out/base-repositoy.port';
import { Where } from '../../types/where.type';

export abstract class BaseListUseCase<
  Entity extends { id: string },
  Input,
  Output,
> implements BaseUseCasePortIn<Input, Output[]>
{
  constructor(private readonly repository: BaseRepositoryPortOut<Entity>) {}

  protected abstract toOutput(entity: Entity): Output;

  protected abstract getWhere(input: Input): Where<Entity> | undefined;

  public async execute(input: Input): Promise<Output[]> {
    const entities = await this.repository.list(this.getWhere(input));
    return entities.map((entity) => this.toOutput(entity));
  }
}
