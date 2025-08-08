import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  CREATE_USER_PORT_IN_TOKEN,
  CreateUserPortIn,
} from '../../ports/in/user/create.port';

@Injectable()
export class SuperUserInitializer implements OnApplicationBootstrap {
  private readonly logger = new Logger(SuperUserInitializer.name);

  constructor(
    @Inject(CREATE_USER_PORT_IN_TOKEN)
    private readonly createUserUseCase: CreateUserPortIn,
  ) {}

  public async onApplicationBootstrap() {
    const email = process.env.SUPERUSER_EMAIL;
    const password = process.env.SUPERUSER_PASSWORD;

    if (!email || !password) {
      this.logger.warn('Super user initialization skipped');
      return;
    }

    try {
      await this.createUserUseCase.execute({
        email,
        password,
        suiteId: 'admin',
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        this.logger.log('Super user already exists');
        return;
      }
      throw error;
    }
    this.logger.log('Super user initialized');
  }
}
