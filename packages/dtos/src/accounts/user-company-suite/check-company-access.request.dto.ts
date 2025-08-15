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
  public readonly userId!: string;

  @IsNotEmpty()
  public readonly companyId!: string;

  @IsNotEmpty()
  public readonly suiteId!: string;
}
