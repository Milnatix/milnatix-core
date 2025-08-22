import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';
import { CustomerAddressDetailsDTO } from '@milnatix-core/dtos';

export const GET_CUSTOMER_ADDRESS_DETAILS_PORT_IN = Symbol(
  'UpdateCustomerAddressPortIn',
);

export type GetCustomerAddressDetailsPortIn = BaseUseCasePortIn<
  IdContext,
  CustomerAddressDetailsDTO
>;
