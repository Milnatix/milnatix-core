import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { DetailContext } from '@/modules/shared/types/detail-context.type';

export const DELETE_CUSTOMER_PORT_IN_TOKEN = Symbol('DeleteCustomerPortIn');

export type DeleteCustomerPortIn = BaseUseCasePortIn<DetailContext, void>;
