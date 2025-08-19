import { ListCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/list.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { CustomerSummaryDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';

@Injectable()
export class ListCusomerUseCase implements ListCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {}

  public async execute(input: {
    companyId: string;
  }): Promise<CustomerSummaryDTO[]> {
    const customersDB = await this.customerRepository.list({
      companyId: input.companyId,
    });
    const customersDTO = customersDB.map((customer) =>
      CustomerMapper.fromEntityToSummaryDTO(customer),
    );
    return customersDTO;
  }
}
