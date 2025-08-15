import { ProductFormData } from '@/application/products/schemas/form.schema';
import { BaseUseCasePortIn } from '../base-usecase.port';
import { Result } from '@/shared/types/Result.type';
import { FormProductResponseDTO } from '@milnatix-core/dtos';

export type CreateProductPortIn = BaseUseCasePortIn<
  ProductFormData,
  Result<FormProductResponseDTO, Error>
>;
