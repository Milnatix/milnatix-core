type SummaryProductResponseDTOProps = {
  id: string;
  name: string;
};

export class SummaryProductResponseDTO
  implements SummaryProductResponseDTOProps
{
  public readonly id: string;
  public readonly name: string;

  constructor(props: SummaryProductResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
