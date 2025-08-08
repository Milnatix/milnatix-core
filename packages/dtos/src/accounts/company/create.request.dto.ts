import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyRequestDTO {
  @IsNotEmpty()
  corporateName!: string;

  @IsNotEmpty()
  tradingName!: string;

  @IsOptional()
  federalDocument!: string | null;
}
