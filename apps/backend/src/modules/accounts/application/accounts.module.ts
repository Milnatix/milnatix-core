import { Module, Provider } from '@nestjs/common';
import { CREATE_USER_PORT_IN_TOKEN } from '../ports/in/user/create.port';
import { CreateUserUseCase } from './usecases/user/create.usecase';
import { UserController } from './controllers/user/user.controller';
import { HASH_PORT_OUT_TOKEN } from '@/modules/shared/ports/out/hash.port';
import { BcryptHashAdapter } from '@/modules/shared/adapters/bcrypt/hash.adapter';
import { USER_REPOSITORY_PORT_TOKEN } from '../ports/out/user-repository.port';
import { PrismaUserRepositoryAdapter } from '../adapters/prisma/user-repository.,adapter';
import { SuiteRegistryInitializer } from './initializers/suite-registry.initializer';
import { SUITE_REPOSITORY_PORT_TOKEN } from '../ports/out/suite-repository.port';
import { PrismaSuiteRepositoryAdapter } from '../adapters/prisma/suite-repository';
import { USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN } from '../ports/out/user-company-suite-repository.port';
import { PrismaUserCompanySuiteRepositoryAdapter } from '../adapters/prisma/user-company-suite-repository.adapter';
import { AuthController } from './controllers/auth/auth.controller';
import { SIGN_IN_PORT_IN_TOKEN } from '../ports/in/auth/sign-in.port';
import { SignInUseCase } from './usecases/auth/sign-in.usecase';
import { TOKEN_PORT_TOKEN } from '../ports/out/token.port';
import { JWTTokenAdapter } from '../adapters/jsonwebtoken/token.adapter';
import { SharedModule } from '@/modules/shared/application/shared.module';
import { SuperUserInitializer } from './initializers/super-user.initializer';
import { CREATE_COMPANY_PORT_IN_TOKEN } from '../ports/in/company/create.port';
import { CreateCompanyUseCase } from './usecases/company/create.usecase';
import { COMPANY_REPOSITORY_PORT_TOKEN } from '../ports/out/company-repository.port';
import { PrismaCompanyRepositoryAdapter } from '../adapters/prisma/company-repository.adapter';
import { CompanyController } from './controllers/company/company.controller';
import { CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN } from '../ports/in/user-company-suite/create.port';
import { CreateUserCompanySuiteUseCase } from './usecases/user-company-suite/create.usecase';
import { UserCompanySuiteController } from './controllers/user-company-suite/user-company-suite.controller';
import { AuthGuard } from '../guards/auth.guard';
import { CompanyGuard } from '../guards/company.guard';
import { CHECK_COMPANY_ACCESS_PORT_IN_TOKEN } from '../ports/in/user-company-suite/check-company-access.port';
import { CheckCompanyAccessUseCase } from './usecases/user-company-suite/check-company-access.usecase';
import { LIST_USERS_PORT_IN_TOKEN } from '../ports/in/user/list.port';
import { ListUsersUseCase } from './usecases/user/list.usecase';

const useCases: Provider[] = [
  {
    provide: CREATE_USER_PORT_IN_TOKEN,
    useClass: CreateUserUseCase,
  },
  {
    provide: SIGN_IN_PORT_IN_TOKEN,
    useClass: SignInUseCase,
  },
  {
    provide: CREATE_COMPANY_PORT_IN_TOKEN,
    useClass: CreateCompanyUseCase,
  },
  {
    provide: CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN,
    useClass: CreateUserCompanySuiteUseCase,
  },
  {
    provide: CHECK_COMPANY_ACCESS_PORT_IN_TOKEN,
    useClass: CheckCompanyAccessUseCase,
  },
  {
    provide: LIST_USERS_PORT_IN_TOKEN,
    useClass: ListUsersUseCase,
  },
];

const adapters: Provider[] = [
  {
    provide: HASH_PORT_OUT_TOKEN,
    useClass: BcryptHashAdapter,
  },
  {
    provide: USER_REPOSITORY_PORT_TOKEN,
    useClass: PrismaUserRepositoryAdapter,
  },
  {
    provide: SUITE_REPOSITORY_PORT_TOKEN,
    useClass: PrismaSuiteRepositoryAdapter,
  },
  {
    provide: USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN,
    useClass: PrismaUserCompanySuiteRepositoryAdapter,
  },
  {
    provide: TOKEN_PORT_TOKEN,
    useClass: JWTTokenAdapter,
  },
  {
    provide: COMPANY_REPOSITORY_PORT_TOKEN,
    useClass: PrismaCompanyRepositoryAdapter,
  },
];

const initializers: Provider[] = [
  SuiteRegistryInitializer,
  SuperUserInitializer,
];

const guards: Provider[] = [AuthGuard, CompanyGuard];

@Module({
  providers: [...useCases, ...adapters, ...initializers, ...guards],
  controllers: [
    UserController,
    AuthController,
    CompanyController,
    UserCompanySuiteController,
  ],
  imports: [SharedModule],
  exports: [...guards, TOKEN_PORT_TOKEN, CHECK_COMPANY_ACCESS_PORT_IN_TOKEN],
})
export class AccountsModule {}
