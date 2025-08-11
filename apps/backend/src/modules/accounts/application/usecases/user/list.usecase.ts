import { ListUsersPortIn } from '@/modules/accounts/ports/in/user/list.port';
import {
  USER_REPOSITORY_PORT_TOKEN,
  UserRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-repository.port';
import { ListUsersResponseDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../../mappers/user.mapper';
import {
  USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN,
  UserCompanySuiteRepositoryPortOut,
} from '@/modules/accounts/ports/out/user-company-suite-repository.port';
import { UserEntity } from '@/modules/accounts/domain/entities/user.entity';
import { UserCompanySuiteEntity } from '@/modules/accounts/domain/entities/user-company-suite.entity';

@Injectable()
export class ListUsersUseCase implements ListUsersPortIn {
  constructor(
    @Inject(USER_REPOSITORY_PORT_TOKEN)
    private readonly userRepository: UserRepositoryPortOut,
    @Inject(USER_COMPANY_SUITE_REPOSITORY_PORT_TOKEN)
    private readonly userCompanySuiteRepository: UserCompanySuiteRepositoryPortOut,
  ) {}

  public async execute(): Promise<ListUsersResponseDTO[]> {
    const usersDB: UserEntity[] = await this.userRepository.list();
    const usersIds: string[] = usersDB.map((user) => user.id);
    const usersCompaniesSuites: UserCompanySuiteEntity[] =
      await this.userCompanySuiteRepository.list({
        userId: {
          in: usersIds,
        },
      });
    const usersDTO: ListUsersResponseDTO[] = usersDB.map((user) => {
      const suiteIds: string[] = usersCompaniesSuites
        .filter((userCompanySuite) => userCompanySuite.userId === user.id)
        .map((userCompanySuite) => userCompanySuite.suiteId);

      return UserMapper.toListUsersResponseDTO(user, suiteIds);
    });
    return usersDTO;
  }
}
