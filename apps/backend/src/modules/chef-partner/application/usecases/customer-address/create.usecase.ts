import { CustomerAddressEntity } from '@/modules/chef-partner/domain/entities/customer-address.entity';
import { CreateCustomerAddressPortIn } from '@/modules/chef-partner/ports/in/customer-address/create.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import { BaseCreateUseCase } from '@/modules/shared/application/usecases/base-create.usecase';
import {
  CreateCustomerAddressRequestDTO,
  SummaryCustomerAddressDTO,
} from '@milnatix-core/dtos';
import { Inject } from '@nestjs/common';
import { CustomerAddressMapper } from '../../mappers/customer-address.mapper';
import { CustomerIdContext } from '@/modules/chef-partner/types/customer-id-context.type';
import { CustomerExistsValidator } from '../../validators/customer/customer-exists.validator';
import { UniqueAddressToCustomerValidator } from '../../validators/customer-address/unique-address-to-customer.validator';

export class CreateCustomerAddressUseCase
  extends BaseCreateUseCase<
    CustomerAddressEntity,
    CustomerIdContext<CreateCustomerAddressRequestDTO>,
    SummaryCustomerAddressDTO
  >
  implements CreateCustomerAddressPortIn
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
    private readonly customerExistsValidator: CustomerExistsValidator,
    private readonly uniqueAddressToCustomerValidator: UniqueAddressToCustomerValidator,
  ) {
    super(customerAddressRepository, [
      customerExistsValidator,
      uniqueAddressToCustomerValidator,
    ]);
  }

  public toEntity(
    input: CustomerIdContext<CreateCustomerAddressRequestDTO>,
  ): CustomerAddressEntity {
    return CustomerAddressMapper.fromCreateCustomerAddressRequestDTOToEntity(
      input.payload,
      input.customerId,
    );
  }
  public toOutput(entity: CustomerAddressEntity): SummaryCustomerAddressDTO {
    return CustomerAddressMapper.fromEntityToSummaryDTO(entity);
  }
}
