import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_PORT_TOKEN, TokenPortOut } from '../ports/out/token.port';
import { AuthenticatedRequest } from '../types/authenticated-request .type';
import { getCookieValue, setCookie } from '@/modules/shared/utils/cookie.util';
import { COOKIE_NAME } from '@/modules/shared/constants/cookie.constants';
import {
  REFRESH_TOKEN_PORT_IN_TOKEN,
  RefreshTokenPortIn,
} from '../ports/in/auth/refresh-token.port';
import {
  FIFTEEN_MINUTES_IN_MS,
  SEVEN_DAYS_IN_MS,
} from '@/modules/shared/constants/time.constants';
import { Response } from 'express';
import { TokenPayloadOutput } from '../types/token-payload-output.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_PORT_TOKEN)
    private readonly tokenAdapter: TokenPortOut,
    @Inject(REFRESH_TOKEN_PORT_IN_TOKEN)
    private readonly refreshTokenUseCase: RefreshTokenPortIn,
  ) {}

  private async handleExpiredToken(
    res: Response,
    refreshToken: string,
  ): Promise<TokenPayloadOutput> {
    const newCredentials = await this.refreshTokenUseCase.execute({
      refreshToken,
    });

    setCookie(res, COOKIE_NAME.REFRESH_TOKEN, newCredentials.refreshToken, {
      maxAge: SEVEN_DAYS_IN_MS,
    });
    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, newCredentials.accessToken, {
      maxAge: FIFTEEN_MINUTES_IN_MS,
    });

    return this.tokenAdapter.verifyAccessToken(newCredentials.accessToken);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const res = context.switchToHttp().getResponse<Response>();

    const accessToken = getCookieValue(req, COOKIE_NAME.ACCESS_TOKEN);
    const refreshToken = getCookieValue(req, COOKIE_NAME.REFRESH_TOKEN);

    if (!accessToken) {
      if (refreshToken) {
        req.user = await this.handleExpiredToken(res, refreshToken);
        return true;
      }
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const payload = this.tokenAdapter.verifyAccessToken(accessToken);
      req.user = payload;
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        if (!refreshToken)
          throw new UnauthorizedException('Refresh token missing');
        req.user = await this.handleExpiredToken(res, refreshToken);
        return true;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
