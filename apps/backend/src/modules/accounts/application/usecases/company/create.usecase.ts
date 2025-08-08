import { CreateCompanyRequestDTO } from '@/modules/accounts/application/dtos/company/create.request.dto';
import { CreateCompanyResponseDTO } from '@/modules/accounts/application/dtos/company/create.response.dto';
import { CompanyMapper } from '@/modules/accounts/application/mappers/company.mapper';
import { CreateCompanyPortIn } from '@/modules/accounts/ports/in/company/create.port';
import {
  COMPANY_REPOSITORY_PORT_TOKEN,
  CompanyRepositoryPortOut,
} from '@/modules/accounts/ports/out/company-repository.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCompanyUseCase implements CreateCompanyPortIn {
  constructor(
    @Inject(COMPANY_REPOSITORY_PORT_TOKEN)
    private readonly companyRepository: CompanyRepositoryPortOut,
  ) {}

  public async execute(
    companyDTO: CreateCompanyRequestDTO,
  ): Promise<CreateCompanyResponseDTO> {
    const company = CompanyMapper.createRequestDTOToEntity(companyDTO);
    await this.companyRepository.create(company);
    return CompanyMapper.entityToCreateResponseDTO(company);
  }
}
