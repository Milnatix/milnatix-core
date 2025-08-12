import { ProductFormData } from "@/application/schemas/product/form.schema";
import { BaseUseCasePortIn } from "../base-usecase.port";
import { Result } from "@/shared/types/Result.type";
import { CreateProductResponseDTO } from "@milnatix-core/dtos";

export type CreateProductPortIn = BaseUseCasePortIn<ProductFormData, Result<CreateProductResponseDTO, Error>>;