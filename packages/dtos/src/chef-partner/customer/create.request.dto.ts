import { IsString, IsOptional, IsEmail, Length, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerAddressRequestDTO {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

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
  zipCode?: string;
}

export class CreateCustomerRequestDTO {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(11, 14, { message: 'federalDocument must be 11 (CPF) or 14 (CNPJ) digits' })
  federalDocument?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerAddressRequestDTO)
  addresses?: CreateCustomerAddressRequestDTO[];

}
