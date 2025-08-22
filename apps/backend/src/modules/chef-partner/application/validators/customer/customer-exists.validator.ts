import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { ValidatorPort } from '@/modules/shared/ports/out/validator.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CustomerExistsValidator
  implements ValidatorPort<{ customerId: string }>
{
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {}

  public async validate({ customerId }: { customerId: string }): Promise<void> {
    console.log('customerId', customerId);
    const customer = await this.customerRepository.findOne({
      id: customerId,
    });
    if (!customer) {
      throw new NotFoundException('Cliente nao encontrado');
    }
  }
}
