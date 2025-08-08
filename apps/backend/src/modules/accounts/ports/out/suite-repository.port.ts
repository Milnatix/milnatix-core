import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { SuiteEntity } from '../../domain/entities/suite.entity';

export const SUITE_REPOSITORY_PORT_TOKEN = Symbol('SuiteRepositoryPort');

export interface SuiteRepositoryPortOut
  extends BaseRepositoryPortOut<SuiteEntity> {
  upsert(user: SuiteEntity): Promise<void>;
}
