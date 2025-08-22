import { ListPaymentMethodPortIn } from '@/modules/finacial/ports/in/payment-method/list.port';
import {
  PAYMENT_METHOD_REPOSITORY_PORT_TOKEN,
  PaymentMethodRepositoryPortOut,
} from '@/modules/finacial/ports/out/payment-method-repositoy.port';
import { SummaryPaymentMethodResponseDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListPaymentMethodUseCase implements ListPaymentMethodPortIn {
  constructor(
    @Inject(PAYMENT_METHOD_REPOSITORY_PORT_TOKEN)
    private paymentMethodRepository: PaymentMethodRepositoryPortOut,
  ) {}

  public async execute(): Promise<SummaryPaymentMethodResponseDTO[]> {
    const paymentMethods = await this.paymentMethodRepository.list();

    return paymentMethods.map(
      (paymentMethod) => new SummaryPaymentMethodResponseDTO(paymentMethod),
    );
  }
}
