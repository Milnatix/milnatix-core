type AuthSignInUserDTO = {
  email: string;
}

type AuthSignInCompanyDTO = {
  id: string;
  tradingName: string;
}

export interface AuthSignInResponseDTOProps {
  user: AuthSignInUserDTO;
  companies: AuthSignInCompanyDTO[];
}

export class AuthSignInResponseDTO implements AuthSignInResponseDTOProps {
  public user: AuthSignInUserDTO;
  public companies: AuthSignInCompanyDTO[];

  constructor(props: AuthSignInResponseDTOProps) {
    this.user = props.user;
    this.companies = props.companies;
  }
}
