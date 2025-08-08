import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { ProductEntity } from '../../domain/entities/product.entity';

export const PRODUCT_REPOSITORY_PORT_TOKEN = Symbol('ProductRepositoryPort');

export type ProductRepositoryPortOut = BaseRepositoryPortOut<ProductEntity>;
