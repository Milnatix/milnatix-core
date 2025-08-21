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
import { Where } from '@/modules/shared/types/where.type';
import { CustomerUniqueValidator } from '../../validators/customer/customer-unique.validator';

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    private readonly customerUniqueValidator: CustomerUniqueValidator,
  ) {}

  private buildCondition<T>(
    field: keyof T,
    value?: string | null,
  ): Where<T> | null {
    return value ? ({ [field]: value } as Where<T>) : null;
  }

  public async execute(
    dto: CreateCustomerRequestDTO & { companyId: string },
  ): Promise<CustomerSummaryDTO> {
    const { companyId } = dto;
    const customerEntity = CustomerMapper.fromCreateRequestDTOToEntity(
      dto,
      companyId,
    );
    await this.customerUniqueValidator.ensureUnique(customerEntity, companyId);
    await this.customerRepository.create(customerEntity);
    return CustomerMapper.fromEntityToSummaryDTO(customerEntity);
  }
}
