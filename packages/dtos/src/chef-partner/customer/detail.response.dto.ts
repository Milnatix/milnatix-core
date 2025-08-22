import { SummaryCustomerAddressDTO } from "../customer-address";

interface CustomerDetailResponseDTOProps {
  fullName: string;
  email: string | null;
  phone: string | null;
  federalDocument: string | null;
  note: string | null;
  addresses: SummaryCustomerAddressDTO[];
}

export class CustomerDetailResponseDTO
  implements CustomerDetailResponseDTOProps
{
  public fullName: string;
  public email: string | null;
  public phone: string | null;
  public federalDocument: string | null;
  public note: string | null;
  public addresses: SummaryCustomerAddressDTO[];

  constructor(props: CustomerDetailResponseDTOProps) {
    this.fullName = props.fullName;
    this.email = props.email;
    this.phone = props.phone;
    this.federalDocument = props.federalDocument;
    this.note = props.note;
    this.addresses = props.addresses.map(
      (address) => new SummaryCustomerAddressDTO(address)
    );
  }
}
