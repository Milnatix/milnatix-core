import { BaseUseCasePortIn } from "../base-usecase.port";
import { Result } from "@/shared/types/Result.type";

export type DeleteProductsPortIn = BaseUseCasePortIn<
  string,
  Result<void, Error>
>;