import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { ListProductInputDTO } from '@/modules/chef-partner/application/dtos/product/list.input.dto';
import { ListProductResponseDTO } from '@milnatix-core/dtos';

export const LIST_PRODUCT_PORT_IN_TOKEN = Symbol('ListProductPortIn');

export type ListProductPortIn = BaseUseCasePortIn<
  ListProductInputDTO,
  ListProductResponseDTO[]
>;
