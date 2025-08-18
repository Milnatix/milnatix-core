interface AuthRefreshInputResponseDTOProps {
  refreshToken: string;
  accessToken: string;
}

export class AuthRefreshInputResponseDTO
  implements AuthRefreshInputResponseDTOProps
{
  public refreshToken: string;
  public accessToken: string;

  constructor(props: AuthRefreshInputResponseDTOProps) {
    this.refreshToken = props.refreshToken;
    this.accessToken = props.accessToken;
  }
}
