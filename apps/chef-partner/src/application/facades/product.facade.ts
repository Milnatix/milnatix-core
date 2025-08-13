'use server';

import { HttpProductRepositoryAdapter } from "@/adapters/http/product-repository.adapter";
import { ListProductsUseCase } from "@/domain/usecases/product/list.usecase";
import { ProductsRepositoryPortOut } from "@/ports/out/product-repository.port";
import { Result } from "@/shared/types/Result.type";
import { CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";
import { SessionServiceProvider } from "../providers/session-service.provider";
import { CreateProductUseCase } from "@/domain/usecases/product/create.usecase";
import { ProductFormData } from "../schemas/product/form.schema";

export async function list(): Promise<Result<ListProductResponseDTO[], Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter();
  const listProductsUseCase = new ListProductsUseCase(productRepository, SessionServiceProvider.getInstance());
  return await listProductsUseCase.execute();
}

export async function create(product: ProductFormData): Promise<Result<CreateProductResponseDTO, Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter();
  const createProductUseCase = new CreateProductUseCase(productRepository, SessionServiceProvider.getInstance());
  return await createProductUseCase.execute(product);
}