import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import { CustomerSummaryDTO } from '@milnatix-core/dtos';

export const LIST_CUSTOMER_PORT_IN_TOKEN = Symbol('ListCustomerPortIn');

export type ListCustomerPortIn = BaseUseCasePortIn<
  CompanyIdContext,
  CustomerSummaryDTO[]
>;
