
type FormProductResponseDTOProps = {
  id: string;
  name: string;
}

export class FormProductResponseDTO implements FormProductResponseDTOProps {
  public readonly id: string;
  public readonly name: string;

  constructor(props: FormProductResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
