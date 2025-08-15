import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDTO {
  @IsEmail()
  public readonly email!: string;

  @IsNotEmpty()
  public readonly password!: string;

  @IsNotEmpty()
  public readonly suiteId!: string;
}
