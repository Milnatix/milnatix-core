import { ListProductResponseDTO } from "@milnatix-core/dtos";
import { BaseUseCasePortIn } from "../base-usecase.port";
import { Result } from "@/shared/types/Result.type";

export type ListProductsPortIn = BaseUseCasePortIn<
  void,
  Result<ListProductResponseDTO[], Error>
>;