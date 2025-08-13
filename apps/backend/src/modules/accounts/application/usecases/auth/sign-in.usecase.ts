import { SignInPortIn } from '@/modules/accounts/ports/in/auth/sign-in.port';
import {
  SUITE_REPOSITORY_PORT_TOKEN,
  SuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/suite-repository.port';
import {
  USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN,
  UserCompanySuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-company-suite-repository.port';
import {
  USER_REPOSITORY_PORT_TOKEN,
  UserRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-repository.port';
import {
  TOKEN_PORT_TOKEN,
  TokenPortOut,
} from '@/modules/accounts/ports/out/token.port';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  HASH_PORT_OUT_TOKEN,
  HashPortOut,
} from '@/modules/shared/ports/out/hash.port';
import { AuthMapper } from '@/modules/accounts/application/mappers/auth.mapper';
import { SuiteId } from '@/modules/accounts/domain/entities/suite.entity';
import {
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';
import { CompanyEntity } from '@/modules/accounts/domain/entities/company.entity';
import {
  COMPANY_REPOSITORY_PORT_TOKEN,
  CompanyRepositoryPortOut,
} from '@/modules/accounts/ports/out/company-repository.port';

@Injectable()
export class SignInUseCase implements SignInPortIn {
  constructor(
    @Inject(USER_REPOSITORY_PORT_TOKEN)
    private readonly userRepository: UserRepositoryPortOut,
    @Inject(USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN)
    private readonly userCompanySuiteRepository: UserCompanySuiteRepositoryPortOut,
    @Inject(SUITE_REPOSITORY_PORT_TOKEN)
    private readonly suiteRepository: SuiteRepositoryPortOut,
    @Inject(TOKEN_PORT_TOKEN)
    private readonly tokenAdapter: TokenPortOut,
    @Inject(HASH_PORT_OUT_TOKEN)
    private readonly hashAdapter: HashPortOut,
    @Inject(COMPANY_REPOSITORY_PORT_TOKEN)
    private readonly companyRepository: CompanyRepositoryPortOut,
  ) {}

  public async execute(
    signInDTO: AuthSignInRequestDTO,
  ): Promise<AuthSignInResponseDTO> {
    const [user, suite] = await Promise.all([
      this.userRepository.findOne({
        email: signInDTO.email,
      }),
      this.suiteRepository.findOne({
        id: signInDTO.suiteId,
      }),
    ]);

    if (!user || !suite) {
      throw new NotFoundException(
        !user ? 'Usuário não encontrado' : 'Projeto não encontrado',
      );
    }

    const isValidPassword = await this.hashAdapter.compare(
      signInDTO.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const userCompaniesSuite = await this.userCompanySuiteRepository.list({
      userId: user.id,
      suiteId: suite.id,
    });

    if (userCompaniesSuite.length === 0) {
      throw new ForbiddenException('Usuário não pertence ao projeto');
    }

    const companiesIds = userCompaniesSuite
      .filter((userCompanySuite) => userCompanySuite.companyId !== null)
      .map((userCompanySuite) => userCompanySuite.companyId!);
    let companies: CompanyEntity[] = [];

    if (companiesIds.length > 0) {
      companies = await this.companyRepository.list({
        id: {
          in: companiesIds,
        },
      });
    }

    const accessToken = this.tokenAdapter.generateAccessToken({
      sub: user.id,
      email: user.email,
      suiteId: suite.id as SuiteId,
    });
    const refreshToken = this.tokenAdapter.generateRefreshToken({
      sub: user.id,
      email: user.email,
      suiteId: suite.id as SuiteId,
    });

    return AuthMapper.toSignInResponseDTO(
      accessToken,
      refreshToken,
      user,
      companies,
    );
  }
}
