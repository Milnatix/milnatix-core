
type CreateProductResponseDTOProps = {
  id: string;
  name: string;
}

export class CreateProductResponseDTO implements CreateProductResponseDTOProps {
  public readonly id: string;
  public readonly name: string;

  constructor(props: CreateProductResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
