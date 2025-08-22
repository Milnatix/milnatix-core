import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';

export const DELETE_CUSTOMER_PORT_IN_TOKEN = Symbol('DeleteCustomerPortIn');

export type DeleteCustomerPortIn = BaseUseCasePortIn<IdContext, void>;
