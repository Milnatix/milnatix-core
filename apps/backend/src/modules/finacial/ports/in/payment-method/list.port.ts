import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { SummaryPaymentMethodResponseDTO } from '@milnatix-core/dtos';

export const LIST_PAYMENT_METHOD_PORT_IN_TOKEN = Symbol(
  'ListPaymentMethodPortIn',
);

export type ListPaymentMethodPortIn = BaseUseCasePortIn<
  void,
  SummaryPaymentMethodResponseDTO[]
>;
