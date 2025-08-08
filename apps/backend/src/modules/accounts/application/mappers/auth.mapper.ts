import { AuthSignInResponseDTO } from '@milnatix-core/dtos';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthMapper {
  public static toSignInResponseDTO(
    accessToken: string,
    refreshToken: string,
    user: UserEntity,
  ): AuthSignInResponseDTO {
    return new AuthSignInResponseDTO({
      accessToken,
      refreshToken,
      user: {
        email: user.email,
      },
    });
  }
}
