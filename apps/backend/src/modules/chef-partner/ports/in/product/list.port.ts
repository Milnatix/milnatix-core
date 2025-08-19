import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';
import { ListProductResponseDTO } from '@milnatix-core/dtos';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';

export const LIST_PRODUCT_PORT_IN_TOKEN = Symbol('ListProductPortIn');

export type ListProductPortIn = BaseUseCasePortIn<
  CompanyIdContext,
  ListProductResponseDTO[]
>;
