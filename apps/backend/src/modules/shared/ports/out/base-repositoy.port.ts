import { Where } from '@/modules/shared/types/where.type';

export interface BaseRepositoryPortOut<Entity> {
  create(entity: Entity): Promise<void>;
  update(id: string, entity: Entity): Promise<void>;
  list(where?: Where<Entity>): Promise<Entity[]>;
  findOne(where: Where<Entity>): Promise<Entity | null>;
  logicalDelete(id: string): Promise<void>;
  trueDelete(id: string): Promise<void>;
}
