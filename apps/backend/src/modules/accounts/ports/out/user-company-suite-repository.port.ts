import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { UserCompanySuiteEntity } from '../../domain/entities/user-company-suite.entity';

export const USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN = Symbol(
  'UserCompanySuiteRepositoryPort',
);

export type UserCompanySuiteRepositoryPortOut =
  BaseRepositoryPortOut<UserCompanySuiteEntity>;
