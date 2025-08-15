
type CreateCompanyResponseDTOProps = {
  id: string;
  corporateName: string;
  tradingName: string;
}

export class CreateCompanyResponseDTO implements CreateCompanyResponseDTOProps {
  public readonly id: string;
  public readonly corporateName: string;
  public readonly tradingName: string;

  constructor(props: CreateCompanyResponseDTOProps) {
    this.id = props.id;
    this.corporateName = props.corporateName;
    this.tradingName = props.tradingName;
  }
}
