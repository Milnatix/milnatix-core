import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export interface FormProductRequestDTOProps {
  name: string;
  description: string | null;
  salePrice: number;
  costPrice: number | null;
}

export class FormProductRequestDTO implements FormProductRequestDTOProps {
  @IsNotEmpty()
  public readonly name!: string;

  @IsOptional()
  public readonly description!: string | null;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  public readonly salePrice!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  public readonly costPrice!: number | null;
}
