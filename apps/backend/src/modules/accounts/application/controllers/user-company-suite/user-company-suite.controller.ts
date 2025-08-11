import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN,
  CreateUserCompanySuitePortIn,
} from '@/modules/accounts/ports/in/user-company-suite/create.port';
import {
  CreateUserCompanySuiteRequestDTO,
  CreateUserCompanySuiteResponseDTO,
} from '@milnatix-core/dtos';

@Controller('user-company-suite')
export class UserCompanySuiteController {
  constructor(
    @Inject(CREATE_USER_COMPANY_SUITE_PORT_IN_TOKEN)
    private readonly createUserCompanySuiteUseCase: CreateUserCompanySuitePortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() userCompanySuiteDTO: CreateUserCompanySuiteRequestDTO,
  ): Promise<CreateUserCompanySuiteResponseDTO> {
    return await this.createUserCompanySuiteUseCase.execute(
      userCompanySuiteDTO,
    );
  }
}
