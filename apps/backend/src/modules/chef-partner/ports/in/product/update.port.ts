import { UpdateProductInputDTO } from '@/modules/chef-partner/application/dtos/product/update.input.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { FormProductResponseDTO } from '@milnatix-core/dtos';

export const UPDATE_PRODUCT_PORT_IN_TOKEN = Symbol('UpdateProductPortIn');

export type UpdateProductPortIn = BaseUseCasePortIn<
  UpdateProductInputDTO,
  FormProductResponseDTO
>;
