import { CreateCustomerAddressRequestDTO } from '@milnatix-core/dtos';
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
}
