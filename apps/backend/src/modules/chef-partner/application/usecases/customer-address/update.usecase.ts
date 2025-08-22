import { CustomerAddressEntity } from '@/modules/chef-partner/domain/entities/customer-address.entity';
import { UpdateCustomerAddressPortIn } from '@/modules/chef-partner/ports/in/customer-address/update.port';
import {
  CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
  CustomerAddressRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-address-repository.port';
import { BaseUpdateUseCase } from '@/modules/shared/application/usecases/base-update.usecase';
import {
  SummaryCustomerAddressDTO,
  UpdateCustomerAddressRequestDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerAddressMapper } from '../../mappers/customer-address.mapper';
import { CustomerChildrenContext } from '@/modules/chef-partner/types/customer-children-context.type';
import { CustomerExistsValidator } from '../../validators/customer/customer-exists.validator';

@Injectable()
export class UpdateCustomerAddressUseCase
  extends BaseUpdateUseCase<
    CustomerAddressEntity,
    CustomerChildrenContext<UpdateCustomerAddressRequestDTO>,
    SummaryCustomerAddressDTO
  >
  implements UpdateCustomerAddressPortIn
{
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN)
    private readonly customerAddressRepository: CustomerAddressRepositoryPortOut,
    private readonly customerExistsValidator: CustomerExistsValidator,
  ) {
    super(customerAddressRepository, [customerExistsValidator]);
  }

  protected getNotFoundMessage(): string {
    return 'Endereço do cliente nao encontrado';
  }

  protected toEntity(
    input: CustomerChildrenContext<UpdateCustomerAddressRequestDTO>,
    current: CustomerAddressEntity,
  ): CustomerAddressEntity {
    return new CustomerAddressEntity({
      ...current,
      ...input.payload,
      customerId: input.customerId,
    });
  }

  protected toOutput(entity: CustomerAddressEntity): SummaryCustomerAddressDTO {
    return CustomerAddressMapper.fromEntityToSummaryDTO(entity);
  }
}
