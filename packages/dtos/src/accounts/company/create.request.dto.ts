import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyRequestDTO {
  @IsNotEmpty()
  public readonly corporateName!: string;

  @IsNotEmpty()
  public readonly tradingName!: string;

  @IsOptional()
  public readonly federalDocument!: string | null;
}
