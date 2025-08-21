import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerAddressRequestDTO {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsOptional()
  @IsString()
  number?: string | null;

  @IsOptional()
  @IsString()
  complement?: string | null;

  @IsString()
  @IsNotEmpty()
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsOptional()
  @IsString()
  zipCode?: string | null;
}
