import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../types/authenticated-request .type';
import {
  CHECK_COMPANY_ACCESS_PORT_IN_TOKEN,
  CheckCompanyAccessPortIn,
} from '../ports/in/user-company-suite/check-company-access.port';
import { SuiteId } from '../domain/entities/suite.entity';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    @Inject(CHECK_COMPANY_ACCESS_PORT_IN_TOKEN)
    private readonly checkCompanyAccessUseCase: CheckCompanyAccessPortIn,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userId = request.user?.sub;
    const suiteId = request.user?.suiteId;

    if (!userId || !suiteId) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const companyId = request.headers['x-company-id'];

    if (!companyId || typeof companyId !== 'string') {
      throw new BadRequestException('x-company-id header is required');
    }

    if (suiteId !== SuiteId.ADMIN) {
      const hasAccess = await this.checkCompanyAccessUseCase.execute({
        userId: userId,
        suiteId: suiteId,
        companyId: companyId,
      });
      if (!hasAccess) {
        throw new UnauthorizedException(
          'User does not have access to this company',
        );
      }
    }

    request.companyId = companyId;
    return true;
  }
}
