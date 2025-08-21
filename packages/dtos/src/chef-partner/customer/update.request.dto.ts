import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCustomerRequestDTO } from "./create.request.dto";

export class UpdateCustomerRequestDTO extends PartialType(
  CreateCustomerRequestDTO
) {}
