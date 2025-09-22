import {
  CreateCustomerAddressRequestDTO,
  CustomerAddressDetailsDTO,
  SummaryCustomerAddressDTO,
  UpdateCustomerAddressRequestDTO,
} from '@milnatix-core/dtos';
import { BaseCrudService } from './base-crud.service';

export class CustomerAddressService extends BaseCrudService<
  CreateCustomerAddressRequestDTO,
  UpdateCustomerAddressRequestDTO,
  SummaryCustomerAddressDTO,
  CustomerAddressDetailsDTO,
  SummaryCustomerAddressDTO,
  { customerId: string }
> {
  protected getBaseUrl(urlParams: { customerId: string }): string {
    return `/chef-partner/customer/${urlParams.customerId}/address`;
  }
}
