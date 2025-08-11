import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  ListUsersResponseDTO,
} from '@milnatix-core/dtos';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserMapper {
  static fromCreateUserRequestDTO(user: CreateUserRequestDTO): UserEntity {
    return new UserEntity({
      email: user.email,
      password: user.password,
    });
  }

  static toCreateUserResponseDTO(user: UserEntity): CreateUserResponseDTO {
    return new CreateUserResponseDTO({
      id: user.id,
      email: user.email,
    });
  }

  static toListUsersResponseDTO(
    user: UserEntity,
    suiteIds: string[],
  ): ListUsersResponseDTO {
    return new ListUsersResponseDTO({
      id: user.id,
      email: user.email,
      suiteIds,
    });
  }
}
