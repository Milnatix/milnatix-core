import { CheckCompanyAccessRequestDTO } from '@/modules/accounts/application/dtos/user-company-suite/check-company-access.request.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const CHECK_COMPANY_ACCESS_PORT_IN_TOKEN = Symbol(
  'CheckCompanyAccessPortIn',
);

export type CheckCompanyAccessPortIn = BaseUseCasePortIn<
  CheckCompanyAccessRequestDTO,
  boolean
>;
