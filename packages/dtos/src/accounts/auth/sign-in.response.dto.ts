type AuthSignInUserDTO = {
  email: string;
}

type AuthSignInCompanyDTO = {
  id: string;
  tradingName: string;
}

type AuthSignInResponseDTOProps = {
  accessToken: string;
  refreshToken: string;
  user: AuthSignInUserDTO;
  companies: AuthSignInCompanyDTO[];
};

export class AuthSignInResponseDTO implements AuthSignInResponseDTOProps {
  public accessToken: string;
  public refreshToken: string;
  public user: AuthSignInUserDTO;
  public companies: AuthSignInCompanyDTO[];

  constructor(props: AuthSignInResponseDTOProps) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
    this.user = props.user;
    this.companies = props.companies;
  }
}
