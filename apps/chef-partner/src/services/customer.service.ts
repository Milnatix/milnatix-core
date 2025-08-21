import {
  CreateCustomerRequestDTO,
  CustomerDetailResponseDTO,
  CustomerSummaryDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';
import { BaseCrudService } from './base-crud.service';

export class CustomerService extends BaseCrudService<
  CreateCustomerRequestDTO,
  UpdateCustomerRequestDTO,
  CustomerSummaryDTO,
  CustomerDetailResponseDTO,
  CustomerSummaryDTO
> {
  constructor() {
    super('/chef-partner/customer');
  }
}
