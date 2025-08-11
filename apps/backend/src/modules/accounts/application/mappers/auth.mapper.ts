import { AuthSignInResponseDTO } from '@milnatix-core/dtos';
import { UserEntity } from '../../domain/entities/user.entity';
import { CompanyEntity } from '../../domain/entities/company.entity';

export class AuthMapper {
  public static toSignInResponseDTO(
    accessToken: string,
    refreshToken: string,
    user: UserEntity,
    companies: CompanyEntity[],
  ): AuthSignInResponseDTO {
    return new AuthSignInResponseDTO({
      accessToken,
      refreshToken,
      user: {
        email: user.email,
      },
      companies: companies.map((company) => ({
        id: company.id,
        tradingName: company.tradingName,
      })),
    });
  }
}
