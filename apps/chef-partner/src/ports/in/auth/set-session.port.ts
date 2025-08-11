import { AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { BaseUseCasePortIn } from "../base-usecase.port";

export type SetSessionPortIn = BaseUseCasePortIn<AuthSignInResponseDTO, void>;