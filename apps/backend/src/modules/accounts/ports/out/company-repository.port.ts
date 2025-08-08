import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';
import { CompanyEntity } from '../../domain/entities/company.entity';

export const COMPANY_REPOSITORY_PORT_TOKEN = Symbol('CompanyRepositoryPort');

export type CompanyRepositoryPortOut = BaseRepositoryPortOut<CompanyEntity>;
