import { ProductEntity } from '../../domain/entities/product.entity';
import {
  FormProductRequestDTO,
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';
import { CreateProductInputDTO } from '../dtos/product/create.input.dto';
import { UpdateProductInputDTO } from '../dtos/product/update.input.dto';

export class ProductMapper {
  public static createInputDTOToEntity(
    productDTO: CreateProductInputDTO,
  ): ProductEntity {
    return new ProductEntity({ ...productDTO, isAvailable: true });
  }

  public static entityToFormResponseDTO(
    product: ProductEntity,
  ): FormProductResponseDTO {
    return new FormProductResponseDTO({ id: product.id, name: product.name });
  }

  public static formRequestToCreateInputDTO(
    requestDTO: FormProductRequestDTO,
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

  public static entityToDetailsDTO(
    product: ProductEntity,
  ): ProductDetailsResponseDTO {
    return new ProductDetailsResponseDTO({
      id: product.id,
      name: product.name,
      description: product.description,
      salePrice: product.salePrice,
      costPrice: product.costPrice || 0,
      isAvailable: product.isAvailable,
    });
  }

  public static updateProductInputDTOToEntity(
    productDTO: UpdateProductInputDTO,
  ): ProductEntity {
    return new ProductEntity({ ...productDTO, isAvailable: true });
  }
}
