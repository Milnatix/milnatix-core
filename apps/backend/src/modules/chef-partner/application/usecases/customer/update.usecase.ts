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

@Injectable()
export class UpdateCustomerUseCase implements UpdateCustomerPortIn {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_PORT_TOKEN)
    private readonly customerRepository: CustomerRepositoryPortOut,
  ) {}

  public async execute(
    dto: DetailContext<UpdateCustomerRequestDTO>,
  ): Promise<FormProductResponseDTO> {
    const customerUpdated = await this.customerRepository.update(dto.id, {
      ...dto.payload,
    });

    if (!customerUpdated) {
      throw new NotFoundException('Customer nao encontrado');
    }

    return CustomerMapper.fromEntityToSummaryDTO(customerUpdated);
  }
}
