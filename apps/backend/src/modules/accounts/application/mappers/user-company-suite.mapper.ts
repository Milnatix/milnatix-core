import {
  CreateUserCompanySuiteRequestDTO,
  CreateUserCompanySuiteResponseDTO,
} from '@milnatix-core/dtos';
import { UserCompanySuiteEntity } from '../../domain/entities/user-company-suite.entity';

export class UserCompanySuiteMappper {
  public static createRequestDTOToEntity(
    userCompanySuiteDTO: CreateUserCompanySuiteRequestDTO,
  ): UserCompanySuiteEntity {
    return new UserCompanySuiteEntity({
      userId: userCompanySuiteDTO.userId,
      companyId: userCompanySuiteDTO.companyId,
      suiteId: userCompanySuiteDTO.suiteId,
    });
  }

  public static entityToCreateResponseDTO(
    userCompanySuite: UserCompanySuiteEntity,
  ): CreateUserCompanySuiteResponseDTO {
    return new CreateUserCompanySuiteResponseDTO({ id: userCompanySuite.id });
  }
}
