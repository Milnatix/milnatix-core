import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { ListUsersResponseDTO } from '@milnatix-core/dtos';

export const LIST_USERS_PORT_IN_TOKEN = Symbol('ListUserPortIn');

export type ListUsersPortIn = BaseUseCasePortIn<void, ListUsersResponseDTO[]>;
