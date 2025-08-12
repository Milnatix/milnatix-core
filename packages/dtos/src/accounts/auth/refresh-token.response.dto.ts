import { IsNotEmpty } from "class-validator";

export class AuthRefreshTokenRequestDTO {
  @IsNotEmpty()
  refreshToken!: string;
}