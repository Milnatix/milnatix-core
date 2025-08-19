import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { CustomerAddressEntity } from '../../domain/entities/customer-address.entity';

export const CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN = Symbol(
  'CustomerAddressRepositoryPort',
);

export type CustomerAddressRepositoryPortOut =
  BaseRepositoryPortOut<CustomerAddressEntity>;
