type AuthSignInUserDTO = {
  email: string;
}

type AuthSignInResponseDTOProps = {
  accessToken: string;
  refreshToken: string;
  user: AuthSignInUserDTO;
};

export class AuthSignInResponseDTO implements AuthSignInResponseDTOProps {
  public accessToken: string;
  public refreshToken: string;
  public user: AuthSignInUserDTO;

  constructor(props: AuthSignInResponseDTOProps) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
    this.user = props.user;
  }
}
