import { GetProductDetailsInputDTO } from '@/modules/chef-partner/application/dtos/product/get-details.input.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';

export const GET_PRODUCT_DETAILS_PORT_IN_TOKEN = Symbol(
  'GetProductDetailsPortIn',
);

export type GetProductDetailsPortIn = BaseUseCasePortIn<
  GetProductDetailsInputDTO,
  ProductDetailsResponseDTO
>;
