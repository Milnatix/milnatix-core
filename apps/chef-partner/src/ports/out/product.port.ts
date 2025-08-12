import { AuthenticatedRequestParams } from "@/shared/types/authenticated-request-params.type";
import { Result } from "@/shared/types/Result.type";
import { CreateProductRequestDTO, CreateProductResponseDTO, ListProductResponseDTO } from "@milnatix-core/dtos";

export interface ProductsRepositoryPortOut {
  list(requestData: AuthenticatedRequestParams): Promise<Result<ListProductResponseDTO[], Error>>
  create(authData: AuthenticatedRequestParams, requestData: CreateProductRequestDTO): Promise<Result<CreateProductResponseDTO, Error>>
}