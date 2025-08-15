'use server';

import { HttpProductRepositoryAdapter } from "@/adapters/http/product-repository.adapter";
import { ListProductsUseCase } from "@/domain/usecases/product/list.usecase";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { Result } from "@/shared/types/Result.type";
import { CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";
import { CreateProductUseCase } from "@/domain/usecases/product/create.usecase";
import { ProductFormData } from "../schemas/product/form.schema";
import { DeleteProductUseCase } from "@/domain/usecases/product/delete.usecase";
import { UniversalSessionAdapter } from "@/adapters/cookies/session-client.adapter";

export async function list(): Promise<Result<ListProductResponseDTO[], Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter(new UniversalSessionAdapter());
  const listProductsUseCase = new ListProductsUseCase(productRepository);
  return await listProductsUseCase.execute();
}

export async function create(product: ProductFormData): Promise<Result<CreateProductResponseDTO, Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter(new UniversalSessionAdapter());
  const createProductUseCase = new CreateProductUseCase(productRepository);
  return await createProductUseCase.execute(product);
}

export async function deleteProduct(productId: string): Promise<Result<void, Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter(new UniversalSessionAdapter());
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  return await deleteProductUseCase.execute(productId);
}