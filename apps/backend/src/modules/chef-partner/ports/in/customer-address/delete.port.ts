import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';

export const DELETE_CUSTOMER_ADDRESS_PORT_IN_TOKEN = Symbol(
  'DeleteCustomerAddressPortIn',
);

export type DeleteCustomerAddressPortIn = BaseUseCasePortIn<IdContext, void>;
