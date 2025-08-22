import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';
import {
  FormProductRequestDTO,
  SummaryProductResponseDTO,
} from '@milnatix-core/dtos';

export const CREATE_PRODUCT_PORT_IN_TOKEN = Symbol('CreateProductPortIn');

export type CreateProductPortIn = BaseUseCasePortIn<
  CompanyIdContext<FormProductRequestDTO>,
  SummaryProductResponseDTO
>;
