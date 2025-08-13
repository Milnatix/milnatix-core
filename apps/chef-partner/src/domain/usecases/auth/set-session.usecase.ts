import { SetSessionPortIn } from "@/ports/in/auth/set-session.port";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { SessionServicePortOut } from '@/ports/out/session.port';

export class SetSessionUseCase implements SetSessionPortIn {

  constructor(private readonly sessionService: SessionServicePortOut) {}

  public async execute(session: AuthSignInResponseDTO): Promise<void> {
    console.log('setSession usecase');
    await this.sessionService.setSession(session)
  }

}