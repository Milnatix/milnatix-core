type ListUsersResponseDTOProps = {
  id: string
  email: string
  suiteIds: string[];
}

export class ListUsersResponseDTO implements ListUsersResponseDTOProps {
  public readonly id: string
  public readonly email: string
  public readonly suiteIds: string[]

  constructor(props: ListUsersResponseDTOProps) {
    this.id = props.id
    this.email = props.email
    this.suiteIds = props.suiteIds
  }
  
}