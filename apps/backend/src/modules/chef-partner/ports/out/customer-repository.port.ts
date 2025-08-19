import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { CustomerEntity } from '../../domain/entities/customer.entity';

export const CUSTOMER_REPOSITORY_PORT_TOKEN = Symbol('CustomerRepositoryPort');

export type CustomerRepositoryPortOut = BaseRepositoryPortOut<CustomerEntity>;
