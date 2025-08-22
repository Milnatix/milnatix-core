import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';

import { CustomerAddressDetailsDTO } from '@milnatix-core/dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetCustomerAddressDetailsPortIn } from '@/modules/chef-partner/ports/in/customer-address/get-detais.port';
import { CustomerAddressMapper } from '../../mappers/customer-address.mapper';

@Injectable()
export class GetCustomerAddressDetailUseCase
  implements GetCustomerAddressDetailsPortIn
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
  ) {}

  public async execute(input: {
    id: string;
  }): Promise<CustomerAddressDetailsDTO> {
    const customerAddress = await this.customerAddressRepository.findOne({
      id: input.id,
    });

    if (!customerAddress) {
      throw new NotFoundException('Endereço do cliente não encontrado');
    }

    return CustomerAddressMapper.fromEntityToDetailsDTO(customerAddress);
  }
}
