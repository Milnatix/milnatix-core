interface SummaryPaymentMethodResponseDTOProps {
  id: string;
  name: string;
}

export class SummaryPaymentMethodResponseDTO
  implements SummaryPaymentMethodResponseDTOProps
{
  public id: string;
  public name: string;

  constructor(props: SummaryPaymentMethodResponseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
