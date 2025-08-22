import { ProductEntity } from '../../domain/entities/product.entity';
import {
  FormProductRequestDTO,
  SummaryProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';
import { CompanyIdContext } from '@/modules/shared/types/company-id-context.type';

export class ProductMapper {
  public static createInputDTOToEntity(
    productDTO: CompanyIdContext<FormProductRequestDTO>,
  ): ProductEntity {
    return new ProductEntity({
      ...productDTO.payload,
      companyId: productDTO.companyId,
      isAvailable: true,
    });
  }

  public static entityToFormResponseDTO(
    product: ProductEntity,
  ): SummaryProductResponseDTO {
    return new SummaryProductResponseDTO({
      id: product.id,
      name: product.name,
    });
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
}
