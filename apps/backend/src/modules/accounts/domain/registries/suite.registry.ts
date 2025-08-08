import {
  SuiteEntityProps,
  SuiteId,
} from '@/modules/accounts/domain/entities/suite.entity';

export const SUITE_REGISTRY = [
  { id: SuiteId.ADMIN, name: 'Admin' },
  { id: SuiteId.CHEF_PARTNER, name: 'Chef Partner' },
] as const satisfies ReadonlyArray<SuiteEntityProps>;
