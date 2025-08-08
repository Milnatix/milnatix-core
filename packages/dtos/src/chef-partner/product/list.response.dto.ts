type ListProductResponseDTOProps = {
  id: string;
  name: string;
  salePrice: number;
}

export class ListProductResponseDTO implements ListProductResponseDTOProps {
  public id: string;
  public name: string;
  public salePrice: number;

  constructor(props: ListProductResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.salePrice = props.salePrice;
  }
}
