import {
  CustomerSummaryDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';

import { IdContext } from '@/modules/shared/types/id-context.type';
import { UpdateCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/update.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerUniqueValidator } from '../../validators/customer/customer-unique.validator';
import { CustomerEntity } from '@/modules/chef-partner/domain/entities/customer.entity';
import { BaseUpdateUseCase } from '@/modules/shared/application/usecases/base-update.usecase';

@Injectable()
export class UpdateCustomerUseCase
  extends BaseUpdateUseCase<
    CustomerEntity,
    IdContext<UpdateCustomerRequestDTO>,
    CustomerSummaryDTO
  >
  implements UpdateCustomerPortIn
{
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    private readonly customerUniqueValidator: CustomerUniqueValidator,
  ) {
    super(customerRepository, [customerUniqueValidator]);
  }

  protected getNotFoundMessage(): string {
    return 'Cliente não encontrado';
  }

  protected toEntity(
    input: IdContext<UpdateCustomerRequestDTO>,
    current: CustomerEntity,
  ): CustomerEntity {
    return new CustomerEntity({
      ...current,
      ...input.payload,
    });
  }

  protected toOutput(entity: CustomerEntity): CustomerSummaryDTO {
    return CustomerMapper.fromEntityToSummaryDTO(entity);
  }
}
