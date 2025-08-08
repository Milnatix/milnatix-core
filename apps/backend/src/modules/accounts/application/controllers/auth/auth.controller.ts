import {
  SIGN_IN_PORT_IN_TOKEN,
  SignInPortIn,
} from '@/modules/accounts/ports/in/auth/sign-in.port';
import {
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SIGN_IN_PORT_IN_TOKEN) private readonly signInUseCase: SignInPortIn,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInDTO: AuthSignInRequestDTO,
  ): Promise<AuthSignInResponseDTO> {
    return await this.signInUseCase.execute(signInDTO);
  }
}
