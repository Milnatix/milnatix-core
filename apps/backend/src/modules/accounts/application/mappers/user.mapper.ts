import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserRequestDTO } from '../dtos/user/create.request.dto';
import { CreateUserResponseDTO } from '../dtos/user/create.response.dto';

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
}
