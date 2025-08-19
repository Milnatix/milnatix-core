import { CreateCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/create.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import {
  CreateCustomerRequestDTO,
  CustomerSummaryDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerAddressMapper } from '../../mappers/customer-address.mapper';

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
  ) {}

  public async execute(
    dto: CreateCustomerRequestDTO & { companyId: string },
  ): Promise<CustomerSummaryDTO> {
    const { addresses, companyId } = dto;
    const customerEntity = CustomerMapper.fromCreateRequestDTOToEntity(
      dto,
      companyId,
    );

    await this.customerRepository.create(customerEntity);

    if (addresses && addresses.length > 0) {
      const addressesEntities = addresses.map((address) =>
        CustomerAddressMapper.fromCreateCustomerAddressRequestDTOToEntity(
          address,
          customerEntity.id,
        ),
      );
      const addressCreatePromises = addressesEntities?.map((address) =>
        this.customerAddressRepository.create(address),
      );
      await Promise.all(addressCreatePromises);
    }

    return CustomerMapper.fromEntityToSummaryDTO(customerEntity);
  }
}
