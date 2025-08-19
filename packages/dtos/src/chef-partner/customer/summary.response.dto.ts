interface CustomerSummaryDTOProps {
  id: string
  name: string
}

export class CustomerSummaryDTO implements CustomerSummaryDTOProps {
  public id: string
  public name: string

  constructor(props: CustomerSummaryDTOProps) {
    this.id = props.id
    this.name = props.name
  }
}