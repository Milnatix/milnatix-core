import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserCompanySuiteRequestDTO {
  @IsNotEmpty()
  public readonly userId!: string;

  @IsOptional()
  public readonly companyId!: string | null;

  @IsNotEmpty()
  public readonly suiteId!: string;
}
