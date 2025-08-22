import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { PaymentMethodEntity } from '../../domain/entities/payment-method.entity';

export const PAYMENT_METHOD_REPOSITORY_PORT_TOKEN = Symbol(
  'PAYMENT_METHOD_REPOSITORY_PORT_TOKEN',
);

export interface PaymentMethodRepositoryPortOut
  extends BaseRepositoryPortOut<PaymentMethodEntity> {
  upsert(user: PaymentMethodEntity): Promise<void>;
}
