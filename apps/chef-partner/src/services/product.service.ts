import {
  FormProductRequestDTO,
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';
import { BaseCrudService } from './base-crud.service';

export class ProductService extends BaseCrudService<
  FormProductRequestDTO,
  UpdateProductRequestDTO,
  FormProductResponseDTO,
  ProductDetailsResponseDTO,
  ListProductResponseDTO
> {
  constructor() {
    super('/chef-partner/product');
  }
}
