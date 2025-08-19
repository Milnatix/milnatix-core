import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { DetailContext } from '@/modules/shared/types/detail-context.type';

export const DELETE_PRODUCT_PORT_IN_TOKEN = Symbol('DeleteProductPortIn');

export type DeleteProductPortIn = BaseUseCasePortIn<DetailContext, void>;
