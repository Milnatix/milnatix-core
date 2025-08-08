import { IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export type CreateProductRequestDTOProps = {
  name: string;
  description: string | null;
  salePrice: number;
  costPrice: number | null;
}

export class CreateProductRequestDTO implements CreateProductRequestDTOProps {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  description!: string | null;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  salePrice!: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  costPrice!: number | null;
}
