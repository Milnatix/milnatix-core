import { CreateProductRequestDTOProps } from '@milnatix-core/dtos';

type CreateProductInputDTOProps = CreateProductRequestDTOProps & {
  companyId: string;
};

export class CreateProductInputDTO implements CreateProductInputDTOProps {
  public readonly name: string;
  public readonly description: string | null;
  public readonly salePrice: number;
  public readonly costPrice: number | null;
  public readonly companyId: string;

  constructor(props: CreateProductInputDTOProps) {
    this.name = props.name;
    this.description = props.description;
    this.salePrice = props.salePrice;
    this.costPrice = props.costPrice;
    this.companyId = props.companyId;
  }
}
