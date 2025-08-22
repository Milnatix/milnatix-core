export interface CustomerAddressDetailsDTOProps {
  id: string;
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string | null;
}

export class CustomerAddressDetailsDTO
  implements CustomerAddressDetailsDTOProps
{
  public id: string;
  public street: string;
  public number: string | null;
  public complement: string | null;
  public neighborhood: string;
  public city: string;
  public state: string;
  public zipCode: string | null;

  constructor(props: CustomerAddressDetailsDTOProps) {
    this.id = props.id;
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.neighborhood = props.neighborhood;
    this.city = props.city;
    this.state = props.state;
    this.zipCode = props.zipCode;
  }
}
