import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import {
  CreateCustomerRequestDTO,
  CustomerSummaryDTO,
} from '@milnatix-core/dtos';

export const CREATE_CUSTOMER_PORT_IN_TOKEN = Symbol('CreateCustomerPortIn');

export type CreateCustomerPortIn = BaseUseCasePortIn<
  CompanyIdContext<CreateCustomerRequestDTO>,
  CustomerSummaryDTO
>;
