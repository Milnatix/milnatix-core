import { CustomerIdContext } from '@/modules/chef-partner/types/customer-id-context.type';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  CreateCustomerAddressRequestDTO,
  SummaryCustomerAddressDTO,
} from '@milnatix-core/dtos';

export const CREATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN = Symbol(
  'CreateCustomerAddressPortIn',
);

export type CreateCustomerAddressPortIn = BaseUseCasePortIn<
  CustomerIdContext<CreateCustomerAddressRequestDTO>,
  SummaryCustomerAddressDTO
>;
