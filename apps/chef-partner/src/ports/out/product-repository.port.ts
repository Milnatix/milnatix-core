import { Result } from '@/shared/types/Result.type';
import {
  FormProductRequestDTO,
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';

export interface ProductsRepositoryPortOut {
  list(): Promise<Result<ListProductResponseDTO[], Error>>;
  create(
    product: FormProductRequestDTO,
  ): Promise<Result<FormProductResponseDTO, Error>>;
  delete(productId: string): Promise<Result<void, Error>>;
  getDetails(
    productId: string,
  ): Promise<Result<ProductDetailsResponseDTO, Error>>;
  update(
    productId: string,
    product: FormProductRequestDTO,
  ): Promise<Result<FormProductResponseDTO, Error>>;
}
