import { CustomerAddressEntity } from '@/modules/chef-partner/domain/entities/customer-address.entity';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import { ValidatorPort } from '@/modules/shared/ports/out/validator.port';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UniqueAddressToCustomerValidator
  implements ValidatorPort<CustomerAddressEntity>
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
  ) {}

  public async validate(customerAddress: CustomerAddressEntity): Promise<void> {
    const addressAlreadyExists = await this.customerAddressRepository.findOne({
      customerId: customerAddress.customerId,
      street: customerAddress.street,
      number: customerAddress.number,
      neighborhood: customerAddress.neighborhood,
      city: customerAddress.city,
      state: customerAddress.state,
    });

    if (addressAlreadyExists) {
      throw new ConflictException('Endereço do cliente ja cadastrado');
    }
  }
}
