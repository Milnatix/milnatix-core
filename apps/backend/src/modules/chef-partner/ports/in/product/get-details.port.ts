import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';
import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';

export const GET_PRODUCT_DETAILS_PORT_IN_TOKEN = Symbol(
  'GetProductDetailsPortIn',
);

export type GetProductDetailsPortIn = BaseUseCasePortIn<
  IdContext,
  ProductDetailsResponseDTO
>;
