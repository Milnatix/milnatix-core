import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';
import {
  SummaryProductResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';

export const UPDATE_PRODUCT_PORT_IN_TOKEN = Symbol('UpdateProductPortIn');

export type UpdateProductPortIn = BaseUseCasePortIn<
  IdContext<UpdateProductRequestDTO>,
  SummaryProductResponseDTO
>;
