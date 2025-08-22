import { CustomerAddressEntity } from '@/modules/chef-partner/domain/entities/customer-address.entity';
import { ListCustomerAddressPortIn } from '@/modules/chef-partner/ports/in/customer-address/list.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import { CustomerIdContext } from '@/modules/chef-partner/types/customer-id-context.type';
import { BaseListUseCase } from '@/modules/shared/application/usecases/base-list.usecase';
import { Where } from '@/modules/shared/types/where.type';
import { SummaryCustomerAddressDTO } from '@milnatix-core/dtos';
import { Inject } from '@nestjs/common';
import { CustomerAddressMapper } from '../../mappers/customer-address.mapper';

export class ListCustomerAddressUseCase
  extends BaseListUseCase<
    CustomerAddressEntity,
    CustomerIdContext,
    SummaryCustomerAddressDTO
  >
  implements ListCustomerAddressPortIn
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
  ) {
    super(customerAddressRepository);
  }

  protected toOutput(entity: CustomerAddressEntity): SummaryCustomerAddressDTO {
    return CustomerAddressMapper.fromEntityToSummaryDTO(entity);
  }

  protected getWhere(input: {
    customerId: string;
  }): Where<CustomerAddressEntity> | undefined {
    return { customerId: input.customerId };
  }
}
