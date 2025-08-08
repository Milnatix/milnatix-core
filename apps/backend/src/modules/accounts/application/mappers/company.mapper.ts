import { CompanyEntity } from '../../domain/entities/company.entity';
import { CreateCompanyRequestDTO } from '../dtos/company/create.request.dto';
import { CreateCompanyResponseDTO } from '../dtos/company/create.response.dto';

export class CompanyMapper {
  public static createRequestDTOToEntity(
    dto: CreateCompanyRequestDTO,
  ): CompanyEntity {
    return new CompanyEntity({
      corporateName: dto.corporateName,
      tradingName: dto.tradingName,
      federalDocument: dto.federalDocument,
    });
  }

  public static entityToCreateResponseDTO(
    company: CompanyEntity,
  ): CreateCompanyResponseDTO {
    return new CreateCompanyResponseDTO({
      id: company.id,
      corporateName: company.corporateName,
      tradingName: company.tradingName,
    });
  }
}
