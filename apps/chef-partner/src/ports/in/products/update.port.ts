import { BaseUseCasePortIn } from '../base-usecase.port';
import { Result } from '@/shared/types/Result.type';
import { FormProductResponseDTO } from '@milnatix-core/dtos';
import { UpdateProductInputDTO } from '@/application/products/dtos/update.input.dto';

export type UpdateProductPortIn = BaseUseCasePortIn<
  UpdateProductInputDTO,
  Result<FormProductResponseDTO, Error>
>;
""