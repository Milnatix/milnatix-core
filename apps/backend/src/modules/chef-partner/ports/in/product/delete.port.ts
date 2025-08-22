import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';

export const DELETE_PRODUCT_PORT_IN_TOKEN = Symbol('DeleteProductPortIn');

export type DeleteProductPortIn = BaseUseCasePortIn<IdContext, void>;
