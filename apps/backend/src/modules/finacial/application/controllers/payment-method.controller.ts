import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import {
  LIST_PAYMENT_METHOD_PORT_IN_TOKEN,
  ListPaymentMethodPortIn,
} from '../../ports/in/payment-method/list.port';
import { SummaryPaymentMethodResponseDTO } from '@milnatix-core/dtos';

@UseGuards(AuthGuard)
@Controller('payment-method')
export class PaymentMethodController {
  constructor(
    @Inject(LIST_PAYMENT_METHOD_PORT_IN_TOKEN)
    private listPaymentMethodUseCase: ListPaymentMethodPortIn,
  ) {}

  @Get()
  async list(): Promise<SummaryPaymentMethodResponseDTO[]> {
    return await this.listPaymentMethodUseCase.execute();
  }
}
