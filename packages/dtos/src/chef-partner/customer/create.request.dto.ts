import {
  IsString,
  IsOptional,
  IsEmail,
  Length,
  IsNotEmpty,
} from "class-validator";

export class CreateCustomerRequestDTO {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsString()
  @Length(11, 14, {
    message: "federalDocument must be 11 (CPF) or 14 (CNPJ) digits",
  })
  federalDocument?: string | null;

  @IsOptional()
  @IsString()
  note?: string | null;
}
