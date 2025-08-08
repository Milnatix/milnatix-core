type CreateUserResponseDTOProps = {
  id: string;
  email: string;
};

export class CreateUserResponseDTO implements CreateUserResponseDTOProps {
  id: string;
  email: string;

  constructor(props: CreateUserResponseDTOProps) {
    this.id = props.id;
    this.email = props.email;
  }
}
