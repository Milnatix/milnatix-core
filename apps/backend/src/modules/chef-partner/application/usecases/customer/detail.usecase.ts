import { GetCustomerDetailsPortIn } from '@/modules/chef-partner/ports/in/customer/detail.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { CustomerDetailResponseDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';

@Injectable()
export class GetCustomerDetailUseCase implements GetCustomerDetailsPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
  ) {}

  public async execute(input: {
    id: string;
    companyId: string;
  }): Promise<CustomerDetailResponseDTO> {
    const [customer, addresses] = await Promise.all([
      this.customerRepository.findOne({
        id: input.id,
        companyId: input.companyId,
      }),
      this.customerAddressRepository.list({
        customerId: input.id,
      }),
    ]);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return CustomerMapper.fromEntitiesToDetailDTO(customer, addresses);
  }
}
