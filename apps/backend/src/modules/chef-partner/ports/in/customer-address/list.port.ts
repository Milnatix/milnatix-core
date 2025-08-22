import { CustomerIdContext } from '@/modules/chef-partner/types/customer-id-context.type';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { SummaryCustomerAddressDTO } from '@milnatix-core/dtos';

export const LIST_CUSTOMER_ADDRESS_PORT_IN_TOKEN = Symbol(
  'ListCustomerAddressPortIn',
);

export type ListCustomerAddressPortIn = BaseUseCasePortIn<
  CustomerIdContext,
  SummaryCustomerAddressDTO[]
>;
