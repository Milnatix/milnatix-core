import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_PORT_TOKEN, TokenPortOut } from '../ports/out/token.port';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from '../types/authenticated-request .type';
import { getCookieValue } from '@/modules/shared/utils/cookie.util';
import { COOKIE_NAME } from '@/modules/shared/constants/cookie.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_PORT_TOKEN)
    private readonly tokenAdapter: TokenPortOut,
  ) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = getCookieValue(request, COOKIE_NAME.ACCESS_TOKEN);
    if (!token) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const payload = this.tokenAdapter.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
