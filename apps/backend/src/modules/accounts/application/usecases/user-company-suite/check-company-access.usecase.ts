import { CheckCompanyAccessPortIn } from '@/modules/accounts/ports/in/user-company-suite/check-company-access.port';
import {
  USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN,
  UserCompanySuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-company-suite-repository.port';
import { CheckCompanyAccessRequestDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckCompanyAccessUseCase implements CheckCompanyAccessPortIn {
  constructor(
    @Inject(USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN)
    private readonly userCompanySuiteRepository: UserCompanySuiteRepositoryPortOut,
  ) {}

  public async execute(dto: CheckCompanyAccessRequestDTO): Promise<boolean> {
    const userCompanySuite = await this.userCompanySuiteRepository.findOne({
      userId: dto.userId,
      suiteId: dto.suiteId,
      companyId: dto.companyId,
    });
    return !!userCompanySuite;
  }
}
