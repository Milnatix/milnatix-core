import { RefreshTokenPortIn } from '@/modules/accounts/ports/in/auth/refresh-token.port';
import {
  TOKEN_PORT_TOKEN,
  TokenPortOut,
} from '@/modules/accounts/ports/out/token.port';
import {
  USER_REPOSITORY_PORT_TOKEN,
  UserRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-repository.port';
import {
  AuthRefreshTokenRequestDTO,
  AuthRefreshTokenResponseDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthMapper } from '../../mappers/auth.mapper';

@Injectable()
export class RefreshTokenUseCase implements RefreshTokenPortIn {
  constructor(
    @Inject(TOKEN_PORT_TOKEN)
    private readonly tokenAdapter: TokenPortOut,
    @Inject(USER_REPOSITORY_PORT_TOKEN)
    private readonly userRepository: UserRepositoryPortOut,
  ) {}

  public async execute(
    refreshTokenDTO: AuthRefreshTokenRequestDTO,
  ): Promise<AuthRefreshTokenResponseDTO> {
    let payload;
    try {
      payload = this.tokenAdapter.verifyRefreshToken(
        refreshTokenDTO.refreshToken,
      );
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    const userId = payload.sub;
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const newAccessToken = this.tokenAdapter.generateAccessToken({
      sub: user.id,
      email: user.email,
      suiteId: payload.suiteId,
    });

    const newRefreshToken = this.tokenAdapter.generateRefreshToken({
      sub: user.id,
      email: user.email,
      suiteId: payload.suiteId,
    });

    return AuthMapper.toRefreshTokenResponseDTO(
      newAccessToken,
      newRefreshToken,
    );
  }
}
