type ListUsersResponseDTOProps = {
  id: string
  email: string
  suiteIds: string[];
}

export class ListUsersResponseDTO implements ListUsersResponseDTOProps {
  public id: string
  public email: string
  public suiteIds: string[]

  constructor(props: ListUsersResponseDTOProps) {
    this.id = props.id
    this.email = props.email
    this.suiteIds = props.suiteIds
  }
  
}