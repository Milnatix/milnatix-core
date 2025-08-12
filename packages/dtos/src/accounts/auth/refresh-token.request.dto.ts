interface AuthRefreshTokenResponseDTOProps {
  refreshToken: string;
  accessToken: string
}


export class AuthRefreshTokenResponseDTO implements AuthRefreshTokenResponseDTOProps {
  public refreshToken: string;
  public accessToken: string;

  constructor(props: AuthRefreshTokenResponseDTOProps) {
    this.refreshToken = props.refreshToken;
    this.accessToken = props.accessToken;
  }
}