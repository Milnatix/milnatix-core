import { ProductDetailsResponseDTO } from '@milnatix-core/dtos';
import { BaseUseCasePortIn } from '../base-usecase.port';
import { Result } from '@/shared/types/Result.type';

export type GetProductDetailsPortIn = BaseUseCasePortIn<
  string,
  Result<ProductDetailsResponseDTO, Error>
>;
