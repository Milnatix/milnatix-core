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

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access token is missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.tokenAdapter.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
