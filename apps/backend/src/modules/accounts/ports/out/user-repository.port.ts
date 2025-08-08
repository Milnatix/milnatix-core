import { UserEntity } from '@/modules/accounts/domain/entities/user.entity';
import { BaseRepositoryPortOut } from '@/modules/shared/ports/out/base-repositoy.port';

export const USER_REPOSITORY_PORT_TOKEN = Symbol('UserRepositoryPort');

export type UserRepositoryPortOut = BaseRepositoryPortOut<UserEntity>;
