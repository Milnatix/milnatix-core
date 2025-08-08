import { CreateUserCompanySuiteRequestDTO } from '@/modules/accounts/application/dtos/user-company-suite/create.request.dto';
import { CreateUserCompanySuiteResponseDTO } from '@/modules/accounts/application/dtos/user-company-suite/create.response.dto';
import { UserCompanySuiteMappper } from '@/modules/accounts/application/mappers/user-company-suite.mapper';
import { CreateUserCompanySuitePortIn } from '@/modules/accounts/ports/in/user-company-suite/create.port';
import {
  COMPANY_REPOSITORY_PORT_TOKEN,
  CompanyRepositoryPortOut,
} from '@/modules/accounts/ports/out/company-repository.port';
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
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';

export class CreateUserCompanySuiteUseCase
  implements CreateUserCompanySuitePortIn
{
  constructor(
    @Inject(USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN)
    private readonly userCompanySuiteRepository: UserCompanySuiteRepositoryPortOut,
    @Inject(USER_REPOSITORY_PORT_TOKEN)
    private readonly userRepository: UserRepositoryPortOut,
    @Inject(SUITE_REPOSITORY_PORT_TOKEN)
    private readonly suiteRepository: SuiteRepositoryPortOut,
    @Inject(COMPANY_REPOSITORY_PORT_TOKEN)
    private readonly companyRepository: CompanyRepositoryPortOut,
  ) {}

  public async execute(
    userCompanySuiteDTO: CreateUserCompanySuiteRequestDTO,
  ): Promise<CreateUserCompanySuiteResponseDTO> {
    const [userCompanySuiteDB, userDB, suiteDB, companyDB] = await Promise.all([
      this.userCompanySuiteRepository.findOne({
        userId: userCompanySuiteDTO.userId,
        suiteId: userCompanySuiteDTO.suiteId,
      }),
      this.userRepository.findOne({
        id: userCompanySuiteDTO.userId,
      }),
      this.suiteRepository.findOne({
        id: userCompanySuiteDTO.suiteId,
      }),
      userCompanySuiteDTO.companyId
        ? this.companyRepository.findOne({
            id: userCompanySuiteDTO.companyId,
          })
        : null,
    ]);

    if (!userDB) {
      throw new NotFoundException('User not found');
    }
    if (!suiteDB) {
      throw new NotFoundException('Suite not found');
    }
    if (userCompanySuiteDTO.companyId && !companyDB) {
      throw new NotFoundException('Company not found');
    }

    if (userCompanySuiteDB) {
      if (userCompanySuiteDB.companyId === userCompanySuiteDTO.companyId) {
        throw new ConflictException('Association already exists');
      }

      userCompanySuiteDB.companyId = userCompanySuiteDTO.companyId;
      await this.userCompanySuiteRepository.update(
        userCompanySuiteDB.id,
        userCompanySuiteDB,
      );

      return UserCompanySuiteMappper.entityToCreateResponseDTO(userCompanySuiteDB);
    }

    const newUserCompanySuite =
      UserCompanySuiteMappper.createRequestDTOToEntity(userCompanySuiteDTO);
    await this.userCompanySuiteRepository.create(newUserCompanySuite);
    return UserCompanySuiteMappper.entityToCreateResponseDTO(newUserCompanySuite);
  }
}
