import {
  FormProductRequestDTO,
  SummaryProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';
import { BaseCrudService } from './base-crud.service';

export class ProductService extends BaseCrudService<
  FormProductRequestDTO,
  UpdateProductRequestDTO,
  SummaryProductResponseDTO,
  ProductDetailsResponseDTO,
  ListProductResponseDTO
> {
  constructor() {
    super('/chef-partner/product');
  }
}
