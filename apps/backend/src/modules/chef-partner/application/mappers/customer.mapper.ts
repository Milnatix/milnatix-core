import {
  CreateCustomerRequestDTO,
  CustomerDetailResponseDTO,
  CustomerSummaryDTO,
} from '@milnatix-core/dtos';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { CustomerAddressEntity } from '../../domain/entities/customer-address.entity';

export class CustomerMapper {
  public static fromCreateRequestDTOToEntity(
    dto: CreateCustomerRequestDTO,
    companyId: string,
  ): CustomerEntity {
    return new CustomerEntity({
      ...dto,
      companyId,
      email: dto.email || null,
      phone: dto.phone || null,
      federalDocument: dto.federalDocument || null,
      note: dto.note || null,
    });
  }

  public static fromEntityToSummaryDTO(
    entity: CustomerEntity,
  ): CustomerSummaryDTO {
    return new CustomerSummaryDTO({
      id: entity.id,
      name: entity.fullName,
    });
  }

  public static fromEntitiesToDetailDTO(
    customer: CustomerEntity,
    addresses: CustomerAddressEntity[],
  ): CustomerDetailResponseDTO {
    return new CustomerDetailResponseDTO({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      federalDocument: customer.federalDocument,
      note: customer.note,
      addresses,
    });
  }
}
