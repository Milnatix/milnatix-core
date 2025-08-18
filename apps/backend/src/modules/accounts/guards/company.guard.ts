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
import { getCookieValue } from '@/modules/shared/utils/cookie.util';
import { COOKIE_NAME } from '@/modules/shared/constants/cookie.constants';

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

    const companyId = getCookieValue(request, COOKIE_NAME.SELECTED_COMPANY_ID);

    if (!companyId) {
      throw new BadRequestException('Selected company is required');
    }

    if (suiteId !== SuiteId.ADMIN) {
      const hasAccess = await this.checkCompanyAccessUseCase.execute({
        userId,
        suiteId,
        companyId,
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
