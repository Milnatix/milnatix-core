import { DeleteCustomerAddressPortIn } from '@/modules/chef-partner/ports/in/customer-address/delete.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteCustomerAddressUseCase
  implements DeleteCustomerAddressPortIn
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerAddressRepositoryPortOut,
  ) {}

  public async execute(input: {
    id: string;
    companyId: string;
  }): Promise<void> {
    const deleted = await this.customerRepository.logicalDelete(input.id);
    if (!deleted) {
      throw new NotFoundException('Endereço do cliente não encontrado');
    }
  }
}
