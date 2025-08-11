import { IsNotEmpty } from 'class-validator';

type CheckCompanyAccessRequestDTOProps = {
  userId: string;
  companyId: string;
  suiteId: string;
}

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
