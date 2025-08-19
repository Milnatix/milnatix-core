import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { DetailContext } from '@/modules/shared/types/detail-context.type';
import { CustomerDetailResponseDTO } from '@milnatix-core/dtos';

export const GET_CUSTOMER_DETAILS_PORT_IN_TOKEN = Symbol(
  'GetCustomerDetailsPortIn',
);

export type GetCustomerDetailsPortIn = BaseUseCasePortIn<
  DetailContext,
  CustomerDetailResponseDTO
>;
