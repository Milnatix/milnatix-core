
interface CustomerDetailAddressResponseDTOProps {
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string | null;
}

interface CustomerDetailResponseDTOProps {
  fullName: string;
  email: string | null;
  phone: string | null;
  federalDocument: string | null;
  note: string | null;
  addresses: CustomerDetailAddressResponseDTO[];
}

export class CustomerDetailAddressResponseDTO implements CustomerDetailAddressResponseDTOProps {
  public street: string;
  public number: string | null;
  public complement: string | null;
  public neighborhood: string;
  public city: string;
  public state: string;
  public zipCode: string | null;

  constructor(props: CustomerDetailAddressResponseDTOProps) {
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.neighborhood = props.neighborhood;
    this.city = props.city;
    this.state = props.state;
    this.zipCode = props.zipCode;
  }
}

export class CustomerDetailResponseDTO implements CustomerDetailResponseDTOProps {
  public fullName: string;
  public email: string | null;
  public phone: string | null;
  public federalDocument: string | null;
  public note: string | null;
  public addresses: CustomerDetailAddressResponseDTO[];

  constructor(props: CustomerDetailResponseDTOProps) {
    this.fullName = props.fullName;
    this.email = props.email;
    this.phone = props.phone;
    this.federalDocument = props.federalDocument;
    this.note = props.note;
    this.addresses = props.addresses.map(address => new CustomerDetailAddressResponseDTO(address));
  }

}
