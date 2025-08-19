import { HttpProductRepositoryAdapter } from '@/adapters/http/product-repository.adapter';
import { ListProductsUseCase } from '@/domain/usecases/product/list.usecase';
import { Result } from '@/shared/types/Result.type';
import {
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
} from '@milnatix-core/dtos';
import { CreateProductUseCase } from '@/domain/usecases/product/create.usecase';
import { ProductFormData } from '../schemas/form.schema';
import { DeleteProductUseCase } from '@/domain/usecases/product/delete.usecase';
import { GetProductDetailsUseCase } from '@/domain/usecases/product/get-details.usecase';
import { UpdateProductUseCase } from '@/domain/usecases/product/update.usecase';

const productRepository = new HttpProductRepositoryAdapter();

export async function list(): Promise<Result<ListProductResponseDTO[], Error>> {
  const listProductsUseCase = new ListProductsUseCase(productRepository);
  return await listProductsUseCase.execute();
}

export async function create(
  product: ProductFormData,
): Promise<Result<FormProductResponseDTO, Error>> {
  const createProductUseCase = new CreateProductUseCase(productRepository);
  return await createProductUseCase.execute(product);
}

export async function deleteProduct(
  productId: string,
): Promise<Result<void, Error>> {
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  return await deleteProductUseCase.execute(productId);
}

export async function getDetails(
  productId: string,
): Promise<Result<ProductDetailsResponseDTO, Error>> {
  const getProductDetailsUseCase = new GetProductDetailsUseCase(
    productRepository,
  );
  return await getProductDetailsUseCase.execute(productId);
}

export async function update(productId: string, product: ProductFormData) {
  const updateProductUseCase = new UpdateProductUseCase(productRepository);
  return await updateProductUseCase.execute({ id: productId, ...product });
}
