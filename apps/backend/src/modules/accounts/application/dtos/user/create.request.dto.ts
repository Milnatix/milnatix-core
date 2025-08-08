import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDTO {
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  public password!: string;

  @IsNotEmpty()
  public suiteId!: string;
}
