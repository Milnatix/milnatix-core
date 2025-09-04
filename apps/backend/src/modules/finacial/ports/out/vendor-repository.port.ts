import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { VendorEntity } from '../../domain/entities/vendor.entity';

export const VENDOR_REPOSITORY_PORT_TOKEN = Symbol(
  'VENDOR_REPOSITORY_PORT_TOKEN',
);

export type VendorRepositoryPortOut = BaseRepositoryPortOut<VendorEntity>;