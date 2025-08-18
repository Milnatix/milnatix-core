import { UserEntity } from '../../domain/entities/user.entity';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { AuthSignInInputResponseDTO } from '../dtos/auth/auth-sign-in-input.response.dto';
import { AuthRefreshInputResponseDTO } from '../dtos/auth/auth-refresh-input.response.dto';

export class AuthMapper {
  public static toSignInInputResponseDTO(
    accessToken: string,
    refreshToken: string,
    user: UserEntity,
    companies: CompanyEntity[],
  ): AuthSignInInputResponseDTO {
    return new AuthSignInInputResponseDTO({
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

  public static toRefreshTokenInputResponseDTO(
    accessToken: string,
    refreshToken: string,
  ): AuthRefreshInputResponseDTO {
    return new AuthRefreshInputResponseDTO({
      accessToken,
      refreshToken,
    });
  }
}
