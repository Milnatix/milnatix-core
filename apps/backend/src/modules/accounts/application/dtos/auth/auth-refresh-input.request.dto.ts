interface AuthRefreshInputRequestDTOProps {
  refreshToken: string;
}

export class AuthRefreshInputRequestDTO
  implements AuthRefreshInputRequestDTOProps
{
  public refreshToken: string;

  constructor(props: AuthRefreshInputRequestDTOProps) {
    this.refreshToken = props.refreshToken;
  }
}
