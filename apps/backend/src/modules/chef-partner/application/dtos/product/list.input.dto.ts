type ListProductInputDTOProps = {
  companyId: string;
};

export class ListProductInputDTO implements ListProductInputDTOProps {
  public companyId: string;

  constructor(props: ListProductInputDTOProps) {
    this.companyId = props.companyId;
  }
}
