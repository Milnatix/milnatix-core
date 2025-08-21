import {
  FormProductResponseDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DetailContext } from '@/modules/shared/types/detail-context.type';
import { UpdateCustomerPortIn } from '@/modules/chef-partner/ports/in/customer/update.port';
import {
  CUSTOMER_REPOSITORY_PORT_TOKEN,
  CustomerRepositoryPortOut,
} from '@/modules/chef-partner/ports/out/customer-repository.port';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerUniqueValidator } from '../../validators/customer/customer-unique.validator';
import { CustomerEntity } from '@/modules/chef-partner/domain/entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase implements UpdateCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
    private readonly customerUniqueValidator: CustomerUniqueValidator,
  ) {}

  public async execute(
    dto: DetailContext<UpdateCustomerRequestDTO>,
  ): Promise<FormProductResponseDTO> {
    const customerInDB = await this.customerRepository.findOne({
      id: dto.id,
      companyId: dto.companyId,
    });

    if (!customerInDB) {
      throw new NotFoundException('Customer nao encontrado');
    }

    const customerToUpdate = new CustomerEntity({
      ...customerInDB,
      ...dto.payload,
    });

    await this.customerUniqueValidator.ensureUnique(
      customerToUpdate,
      customerToUpdate.companyId,
      customerToUpdate.id,
    );

    const customerUpdated = await this.customerRepository.update(
      dto.id,
      customerToUpdate,
    );

    return CustomerMapper.fromEntityToSummaryDTO(customerUpdated);
  }
}
