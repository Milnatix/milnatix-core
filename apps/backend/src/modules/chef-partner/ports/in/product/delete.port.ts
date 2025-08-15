import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const DELETE_PRODUCT_PORT_IN_TOKEN = Symbol('DeleteProductPortIn');

export type DeleteProductPortIn = BaseUseCasePortIn<
  { productId: string },
  void
>;
