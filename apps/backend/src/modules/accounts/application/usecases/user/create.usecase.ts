import { CreateUserRequestDTO } from '@/modules/accounts/application/dtos/user/create.request.dto';
import { CreateUserResponseDTO } from '@/modules/accounts/application/dtos/user/create.response.dto';
import { UserMapper } from '@/modules/accounts/application/mappers/user.mapper';
import { CreateUserPortIn } from '@/modules/accounts/ports/in/user/create.port';
import {
  USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN,
  UserCompanySuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-company-suite-repository.port';
import {
  UserRepositoryPortOut,
  USER_REPOSITORY_PORT_TOKEN,
} from '@/modules/accounts/ports/out/user-repository.port';
import {
  HASH_PORT_OUT_TOKEN,
  HashPortOut,
} from '@/modules/shared/ports/out/hash.port';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SUITE_REPOSITORY_PORT_TOKEN,
  SuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/suite-repository.port';
import { UserCompanySuiteEntity } from '../../../domain/entities/user-company-suite.entity';

@Injectable()
export class CreateUserUseCase implements CreateUserPortIn {
  constructor(
    @Inject(USER_REPOSITORY_PORT_TOKEN)
    private readonly userRepository: UserRepositoryPortOut,
    @Inject(HASH_PORT_OUT_TOKEN)
    private readonly hashAdapter: HashPortOut,
    @Inject(USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN)
    private readonly userCompanySuiteRepository: UserCompanySuiteRepositoryPortOut,
    @Inject(SUITE_REPOSITORY_PORT_TOKEN)
    private readonly suiteRepository: SuiteRepositoryPortOut,
  ) {}

  public async execute(
    userDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const password = await this.hashAdapter.hash(userDTO.password);
    const user = UserMapper.fromCreateUserRequestDTO({ ...userDTO, password });

    const suite = await this.suiteRepository.findOne({
      id: userDTO.suiteId,
    });
    if (!suite) {
      throw new NotFoundException('Suite not found');
    }

    const userExists = await this.userRepository.findOne({
      email: user.email.toLowerCase().trim(),
    });
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const userCompanySuite = new UserCompanySuiteEntity({
      userId: user.id,
      companyId: null,
      suiteId: suite.id,
    });

    try {
      await this.userRepository.create(user);
      await this.userCompanySuiteRepository.create(userCompanySuite);
    } catch {
      await this.userRepository.trueDelete(user.id);
      await this.userCompanySuiteRepository.trueDelete(userCompanySuite.id);
    }
    return UserMapper.toCreateUserResponseDTO(user);
  }
}
