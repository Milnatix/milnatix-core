'use server'

import { HttpProductRepositoryAdapter } from "@/adapters/http/product-repository.adapter";
import { ListProductsUseCase } from "@/domain/usecases/product/list.usecase";
import { ProductsRepositoryPortOut } from "@/ports/out/product.port";
import { Result } from "@/shared/types/Result.type";
import { ListProductResponseDTO } from "@milnatix-core/dtos";
import { SessionServiceProvider } from "../providers/session-service.provider";

export async function list(): Promise<Result<ListProductResponseDTO[], Error>> {
  const productRepository: ProductsRepositoryPortOut = new HttpProductRepositoryAdapter();
  const listProductsUseCase = new ListProductsUseCase(productRepository, SessionServiceProvider.getInstance());
  return await listProductsUseCase.execute();
}