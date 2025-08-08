import { CreateUserRequestDTO } from '@/modules/accounts/application/dtos/user/create.request.dto';
import { CreateUserResponseDTO } from '@/modules/accounts/application/dtos/user/create.response.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const CREATE_USER_PORT_IN_TOKEN = Symbol('CreateUserPortIn');

export type CreateUserPortIn = BaseUseCasePortIn<
  CreateUserRequestDTO,
  CreateUserResponseDTO
>;
