import { ProductFormData } from "../schemas/form.schema";

export interface UpdateProductInputDTO extends ProductFormData {
  id: string
}