import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { CheckCompanyAccessRequestDTO } from '@milnatix-core/dtos';

export const CHECK_COMPANY_ACCESS_PORT_IN_TOKEN = Symbol(
  'CheckCompanyAccessPortIn',
);

export type CheckCompanyAccessPortIn = BaseUseCasePortIn<
  CheckCompanyAccessRequestDTO,
  boolean
>;
