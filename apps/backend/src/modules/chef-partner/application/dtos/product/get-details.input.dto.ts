interface GetProductDetailsInputDTOProps {
  productId: string;
  companyId: string;
}

export class GetProductDetailsInputDTO {
  public readonly productId: string;
  public readonly companyId: string;

  constructor(props: GetProductDetailsInputDTOProps) {
    this.productId = props.productId;
    this.companyId = props.companyId;
  }
}
