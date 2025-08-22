import { SharedModule } from '@/modules/shared/application/shared.module';
import { Module, Provider } from '@nestjs/common';
import { PAYMENT_METHOD_REPOSITORY_PORT_TOKEN } from '../ports/out/payment-method-repositoy.port';
import { PrismaPaymentMethodRepositoryAdapter } from '../adapters/prisma/payment-method-repository.adapter';
import { PaymentMethodRegistryInitializer } from './initializers/payment-method-registry.initializer';
import { AccountsModule } from '@/modules/accounts/application/accounts.module';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { LIST_PAYMENT_METHOD_PORT_IN_TOKEN } from '../ports/in/payment-method/list.port';
import { ListPaymentMethodUseCase } from './usecases/payment-method/list.usecase';

const adapters: Provider[] = [
  {
    provide: PAYMENT_METHOD_REPOSITORY_PORT_TOKEN,
    useClass: PrismaPaymentMethodRepositoryAdapter,
  },
];

const usecases: Provider[] = [
  {
    provide: LIST_PAYMENT_METHOD_PORT_IN_TOKEN,
    useClass: ListPaymentMethodUseCase,
  },
];

const initializers: Provider[] = [PaymentMethodRegistryInitializer];

@Module({
  providers: [...adapters, ...usecases, ...initializers],
  controllers: [PaymentMethodController],
  imports: [SharedModule, AccountsModule],
})
export class FinancialModule {}
