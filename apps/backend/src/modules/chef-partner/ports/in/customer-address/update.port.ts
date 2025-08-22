import { CustomerChildrenContext } from '@/modules/chef-partner/types/customer-children-context.type';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  SummaryCustomerAddressDTO,
  UpdateCustomerAddressRequestDTO,
} from '@milnatix-core/dtos';

export const UPDATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN = Symbol(
  'UpdateCustomerAddressPortIn',
);

export type UpdateCustomerAddressPortIn = BaseUseCasePortIn<
  CustomerChildrenContext<UpdateCustomerAddressRequestDTO>,
  SummaryCustomerAddressDTO
>;
