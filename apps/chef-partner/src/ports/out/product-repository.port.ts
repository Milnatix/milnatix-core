import { Result } from "@/shared/types/Result.type";
import { CreateProductRequestDTO, CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";

export interface ProductsRepositoryPortOut {
  list(): Promise<Result<ListProductResponseDTO[], Error>>
  create(requestData: CreateProductRequestDTO): Promise<Result<CreateProductResponseDTO, Error>>
  delete(productId: string): Promise<Result<void, Error>>
}