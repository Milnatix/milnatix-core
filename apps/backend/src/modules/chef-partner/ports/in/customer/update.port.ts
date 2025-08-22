import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { IdContext } from '@/modules/shared/types/id-context.type';
import {
  SummaryProductResponseDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';

export const UPDATE_CUSTOMER_PORT_IN_TOKEN = Symbol('UpdateCustomerPortIn');

export type UpdateCustomerPortIn = BaseUseCasePortIn<
  IdContext<UpdateCustomerRequestDTO>,
  SummaryProductResponseDTO
>;
