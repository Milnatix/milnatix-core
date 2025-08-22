import { CreateCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/create.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import {
  CreateCustomerRequestDTO,
  CustomerSummaryDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerUniqueValidator } from '../../validators/customer/customer-unique.validator';
import { BaseCreateUseCase } from '@/modules/shared/application/usecases/base-create.usecase';
import { CustomerEntity } from '@/modules/chef-partner/domain/entities/customer.entity';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';

@Injectable()
export class CreateCustomerUseCase
  extends BaseCreateUseCase<
    CustomerEntity,
    CompanyIdContext<CreateCustomerRequestDTO>,
    CustomerSummaryDTO
  >
  implements CreateCustomerPortIn
{
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    private readonly customerUniqueValidator: CustomerUniqueValidator,
  ) {
    super(customerRepository, [customerUniqueValidator]);
  }

  public toEntity(
    input: CompanyIdContext<CreateCustomerRequestDTO>,
  ): CustomerEntity {
    return CustomerMapper.fromCreateRequestDTOToEntity(
      input.payload,
      input.companyId,
    );
  }

  public toOutput(entity: CustomerEntity): CustomerSummaryDTO {
    return CustomerMapper.fromEntityToSummaryDTO(entity);
  }
}
