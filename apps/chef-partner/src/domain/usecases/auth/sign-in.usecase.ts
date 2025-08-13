import { SignInFormData } from "@/application/schemas/auth/sign-in.schema";
import { SignInPortIn } from "@/ports/in/auth/sign-in.port";
import { AuthRepositoryPortOut } from "@/ports/out/auth-repository.port";
import { Result } from "@/shared/types/Result.type";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";

export class SignInUseCase implements SignInPortIn {
  constructor(private readonly authRepository: AuthRepositoryPortOut) {}

  public async execute(input: SignInFormData): Promise<Result<AuthSignInResponseDTO, Error>> {
    return await this.authRepository.signIn({
      ...input,
      suiteId: 'chef-partner'
    });
  }

}