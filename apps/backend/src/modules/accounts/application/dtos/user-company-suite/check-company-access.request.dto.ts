import { UserCompanySuiteEntity } from '@/modules/accounts/domain/entities/user-company-suite.entity';
import { IsNotEmpty } from 'class-validator';

type CheckCompanyAccessRequestDTOProps = Omit<
  Pick<UserCompanySuiteEntity, 'userId' | 'companyId' | 'suiteId'>,
  'companyId'
> & {
  companyId: string;
};

export class CheckCompanyAccessRequestDTO
  implements CheckCompanyAccessRequestDTOProps
{
  @IsNotEmpty()
  public userId!: string;

  @IsNotEmpty()
  public companyId!: string;

  @IsNotEmpty()
  public suiteId!: string;
}
