
type CreateCompanyResponseDTOProps = {
  id: string;
  corporateName: string;
  tradingName: string;
}

export class CreateCompanyResponseDTO implements CreateCompanyResponseDTOProps {
  public id: string;
  public corporateName: string;
  public tradingName: string;

  constructor(props: CreateCompanyResponseDTOProps) {
    this.id = props.id;
    this.corporateName = props.corporateName;
    this.tradingName = props.tradingName;
  }
}
