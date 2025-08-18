import {
  AuthSignInResponseDTO,
  AuthSignInResponseDTOProps,
} from '@milnatix-core/dtos';

interface AuthSignInInputResponseDTOProps extends AuthSignInResponseDTOProps {
  accessToken: string;
  refreshToken: string;
}

export class AuthSignInInputResponseDTO
  extends AuthSignInResponseDTO
  implements AuthSignInInputResponseDTOProps
{
  public accessToken: string;
  public refreshToken: string;

  constructor(props: AuthSignInInputResponseDTOProps) {
    super(props);
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
