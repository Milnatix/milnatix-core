import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserCompanySuiteRequestDTO {
  @IsNotEmpty()
  userId!: string;

  @IsOptional()
  companyId!: string | null;

  @IsNotEmpty()
  suiteId!: string;
}
