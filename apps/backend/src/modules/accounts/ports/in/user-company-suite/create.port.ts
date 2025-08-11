import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  CreateUserCompanySuiteRequestDTO,
  CreateUserCompanySuiteResponseDTO,
} from '@milnatix-core/dtos';

export const CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN = Symbol(
  'CreateUserCompanySuitePortIn',
);

export type CreateUserCompanySuitePortIn = BaseUseCasePortIn<
  CreateUserCompanySuiteRequestDTO,
  CreateUserCompanySuiteResponseDTO
>;
