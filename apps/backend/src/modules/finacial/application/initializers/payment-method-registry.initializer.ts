import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  PAYMENT_METHOD_REPOSITORY_PORT_TOKEN,
  PaymentMethodRepositoryPortOut,
} from '../../ports/out/payment-method-repositoy.port';
import { PAYMENT_METHOD_REGISTRY } from '../../domain/registries/payment-method.registry';
import { PaymentMethodEntity } from '../../domain/entities/payment-method.entity';

@Injectable()
export class PaymentMethodRegistryInitializer
  implements OnApplicationBootstrap
{
  private readonly logger = new Logger(PaymentMethodRegistryInitializer.name);

  constructor(
    @Inject(PAYMENT_METHOD_REPOSITORY_PORT_TOKEN)
    private readonly paymentMethodRepository: PaymentMethodRepositoryPortOut,
  ) {}

  async onApplicationBootstrap() {
    const paymentMethods = PAYMENT_METHOD_REGISTRY.map(
      (paymentMethod) => new PaymentMethodEntity(paymentMethod),
    );
    await Promise.all(
      paymentMethods.map(async (paymentMethod) => {
        try {
          await this.paymentMethodRepository.upsert(paymentMethod);
        } catch (error) {
          this.logger.error(error);
        }
      }),
    );
    this.logger.log('Payment method registry initialized');
  }
}
