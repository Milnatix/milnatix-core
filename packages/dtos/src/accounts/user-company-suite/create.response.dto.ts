interface CreateUserCompanySuiteResponseDTOProps {
  id: string;
}

export class CreateUserCompanySuiteResponseDTO
  implements CreateUserCompanySuiteResponseDTOProps
{
  public readonly id: string;

  constructor(props: CreateUserCompanySuiteResponseDTOProps) {
    this.id = props.id;
  }
}
