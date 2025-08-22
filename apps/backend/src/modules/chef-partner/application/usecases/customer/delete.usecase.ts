import { DeleteCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/delete.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteCustomerUseCase implements DeleteCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {}

  public async execute(input: {
    id: string;
    companyId: string;
  }): Promise<void> {
    const deleted = await this.customerRepository.logicalDelete(input.id);
    if (!deleted) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }
}
