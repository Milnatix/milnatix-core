type ListProductResponseDTOProps = {
  id: string;
  name: string;
  salePrice: number;
}

export class ListProductResponseDTO implements ListProductResponseDTOProps {
  public readonly id: string;
  public readonly name: string;
  public readonly salePrice: number;

  constructor(props: ListProductResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.salePrice = props.salePrice;
  }
}
