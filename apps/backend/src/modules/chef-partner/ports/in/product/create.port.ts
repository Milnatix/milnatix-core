import { CreateProductInputDTO } from '@/modules/chef-partner/application/dtos/product/create.input.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { CreateProductResponseDTO } from '@milnatix-core/dtos';

export const CREATE_PRODUCT_PORT_IN_TOKEN = Symbol('CreateProductPortIn');

export type CreateProductPortIn = BaseUseCasePortIn<
  CreateProductInputDTO,
  CreateProductResponseDTO
>;
