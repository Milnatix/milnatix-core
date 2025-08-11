import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from '@milnatix-core/dtos';

export const CREATE_USER_PORT_IN_TOKEN = Symbol('CreateUserPortIn');

export type CreateUserPortIn = BaseUseCasePortIn<
  CreateUserRequestDTO,
  CreateUserResponseDTO
>;
