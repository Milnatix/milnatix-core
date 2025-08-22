export interface SummaryCustomerAddressDTOProps {
  id: string;
  street: string;
  number: string;
}

export class SummaryCustomerAddressDTO
  implements SummaryCustomerAddressDTOProps
{
  public id: string;
  public street: string;
  public number: string;

  constructor(props: SummaryCustomerAddressDTOProps) {
    this.id = props.id;
    this.street = props.street;
    this.number = props.number;
  }
}
