import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerAddressRequestDTO } from "./create.request.dto";

export class UpdateCustomerAddressRequestDTO extends PartialType(
  CreateCustomerAddressRequestDTO
) {}
