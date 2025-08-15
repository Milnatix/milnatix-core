import { FormProductRequestDTOProps } from '@milnatix-core/dtos';

export interface CreateProductInputDTOProps extends FormProductRequestDTOProps {
  companyId: string;
}

export class CreateProductInputDTO implements CreateProductInputDTOProps {
  public readonly companyId: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly salePrice: number;
  public readonly costPrice: number | null;

  constructor(props: CreateProductInputDTOProps) {
    this.companyId = props.companyId;
    this.name = props.name;
    this.description = props.description;
    this.salePrice = props.salePrice;
    this.costPrice = props.costPrice;
  }
}
