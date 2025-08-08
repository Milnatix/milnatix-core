import { CreateUserCompanySuiteRequestDTO } from '@/modules/accounts/application/dtos/user-company-suite/create.request.dto';
import { CreateUserCompanySuiteResponseDTO } from '@/modules/accounts/application/dtos/user-company-suite/create.response.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN = Symbol(
  'CreateUserCompanySuitePortIn',
);

export type CreateUserCompanySuitePortIn = BaseUseCasePortIn<
  CreateUserCompanySuiteRequestDTO,
  CreateUserCompanySuiteResponseDTO
>;
