import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignInRequestDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  public suiteId!: string;
}
