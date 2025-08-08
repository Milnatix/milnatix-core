import {
  CREATE_COMPANY_PORT_IN_TOKEN,
  CreateCompanyPortIn,
} from '@/modules/accounts/ports/in/company/create.port';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyRequestDTO } from '../../dtos/company/create.request.dto';
import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import { CreateCompanyResponseDTO } from '../../dtos/company/create.response.dto';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CREATE_COMPANY_PORT_IN_TOKEN)
    private readonly createCompanyUseCase: CreateCompanyPortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() companyDTO: CreateCompanyRequestDTO,
  ): Promise<CreateCompanyResponseDTO> {
    return await this.createCompanyUseCase.execute(companyDTO);
  }
}
