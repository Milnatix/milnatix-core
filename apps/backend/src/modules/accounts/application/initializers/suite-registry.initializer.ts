import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  SUITE_REPOSITORY_PORT_TOKEN,
  SuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/suite-repository.port';
import { SUITE_REGISTRY } from '../../domain/registries/suite.registry';
import { SuiteEntity } from '../../domain/entities/suite.entity';

@Injectable()
export class SuiteRegistryInitializer implements OnApplicationBootstrap {
  private readonly logger = new Logger(SuiteRegistryInitializer.name);

  constructor(
    @Inject(SUITE_REPOSITORY_PORT_TOKEN)
    private readonly suiteRepository: SuiteRepositoryPortOut,
  ) {}

  async onApplicationBootstrap() {
    const suites = SUITE_REGISTRY.map((suite) => new SuiteEntity(suite));
    await Promise.all(
      suites.map(async (suite) => {
        try {
          await this.suiteRepository.upsert(suite);
        } catch (error) {
          this.logger.error(error);
        }
      }),
    );
    this.logger.log('Suite registry initialized');
  }
}
