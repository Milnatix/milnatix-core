import { Where } from '@/modules/shared/types/where.type';

export interface BaseRepositoryPortOut<Entity> {
  create(entity: Entity): Promise<Entity>;
  update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
  list(where?: Where<Entity>): Promise<Entity[]>;
  findOne(where: Where<Entity>): Promise<Entity | null>;
  logicalDelete(id: string): Promise<Entity | null>;
  trueDelete(id: string): Promise<Entity | null>;
}
