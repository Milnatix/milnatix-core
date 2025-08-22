import {
  CreateCustomerAddressRequestDTO,
  CustomerAddressDetailsDTO,
  SummaryCustomerAddressDTO,
} from '@milnatix-core/dtos';
import { CustomerAddressEntity } from '../../domain/entities/customer-address.entity';

export class CustomerAddressMapper {
  public static fromCreateCustomerAddressRequestDTOToEntity(
    dto: CreateCustomerAddressRequestDTO,
    customerId: string,
  ): CustomerAddressEntity {
    return new CustomerAddressEntity({
      city: dto.city,
      complement: dto.complement || null,
      customerId,
      neighborhood: dto.neighborhood,
      number: dto.number || null,
      state: dto.state,
      street: dto.street,
      zipCode: dto.zipCode || null,
    });
  }

  public static fromEntityToSummaryDTO(
    entity: CustomerAddressEntity,
  ): SummaryCustomerAddressDTO {
    return new SummaryCustomerAddressDTO({
      id: entity.id,
      street: entity.street,
      number: entity.number,
    });
  }

  public static fromEntityToDetailsDTO: (
    entity: CustomerAddressEntity,
  ) => CustomerAddressDetailsDTO = (entity) => {
    return new CustomerAddressDetailsDTO({
      id: entity.id,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      neighborhood: entity.neighborhood,
      city: entity.city,
      state: entity.state,
      zipCode: entity.zipCode,
    });
  };
}
