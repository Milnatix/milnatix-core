type CreateUserResponseDTOProps = {
  id: string;
  email: string;
};

export class CreateUserResponseDTO implements CreateUserResponseDTOProps {
  public readonly id: string;
  public readonly email: string;

  constructor(props: CreateUserResponseDTOProps) {
    this.id = props.id;
    this.email = props.email;
  }
}
