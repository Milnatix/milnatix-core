import { ProductEntity } from '../../domain/entities/product.entity';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ListProductResponseDTO,
} from '@milnatix-core/dtos';
import { CreateProductInputDTO } from '../dtos/product/create.input.dto';

export class ProductMapper {
  public static createInputDTOToEntity(
    productDTO: CreateProductInputDTO,
  ): ProductEntity {
    return new ProductEntity({ ...productDTO, isAvailable: true });
  }

  public static entityToCreateResponseDTO(
    product: ProductEntity,
  ): CreateProductResponseDTO {
    return new CreateProductResponseDTO({ id: product.id, name: product.name });
  }

  public static createRequestToCreateInputDTO(
    requestDTO: CreateProductRequestDTO,
    companyId: string,
  ): CreateProductInputDTO {
    return new CreateProductInputDTO({ ...requestDTO, companyId });
  }

  public static entityToListDTO(
    product: ProductEntity,
  ): ListProductResponseDTO {
    return new ListProductResponseDTO({
      id: product.id,
      name: product.name,
      salePrice: product.salePrice,
    });
  }
}
