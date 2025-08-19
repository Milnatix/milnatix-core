import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { DetailContext } from '@/modules/shared/types/detail-context.type';
import {
  FormProductResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';

export const UPDATE_PRODUCT_PORT_IN_TOKEN = Symbol('UpdateProductPortIn');

export type UpdateProductPortIn = BaseUseCasePortIn<
  DetailContext<UpdateProductRequestDTO>,
  FormProductResponseDTO
>;
