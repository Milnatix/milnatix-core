import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { DetailContext } from '@/modules/shared/types/detail-context.type';
import {
  FormProductResponseDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';

export const UPDATE_CUSTOMER_PORT_IN_TOKEN = Symbol('UpdateCustomerPortIn');

export type UpdateCustomerPortIn = BaseUseCasePortIn<
  DetailContext<UpdateCustomerRequestDTO>,
  FormProductResponseDTO
>;
