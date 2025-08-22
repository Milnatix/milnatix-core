import { ListCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/list.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { CustomerSummaryDTO } from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { BaseListUseCase } from '@/modules/shared/application/usecases/base-list.usecase';
import { CustomerEntity } from '@/modules/chef-partner/domain/entities/customer.entity';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import { Where } from '@/modules/shared/types/where.type';

@Injectable()
export class ListCusomerUseCase
  extends BaseListUseCase<CustomerEntity, CompanyIdContext, CustomerSummaryDTO>
  implements ListCustomerPortIn
{
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {
    super(customerRepository);
  }

  protected getWhere(input: {
    companyId: string;
  }): Where<CustomerEntity> | undefined {
    return { companyId: input.companyId };
  }

  protected toOutput(entity: CustomerEntity): CustomerSummaryDTO {
    return CustomerMapper.fromEntityToSummaryDTO(entity);
  }
}
