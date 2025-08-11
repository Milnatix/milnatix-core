interface CreateUserCompanySuiteResponseDTOProps {
  id: string;
}

export class CreateUserCompanySuiteResponseDTO
  implements CreateUserCompanySuiteResponseDTOProps
{
  public id: string;

  constructor(props: CreateUserCompanySuiteResponseDTOProps) {
    this.id = props.id;
  }
}
