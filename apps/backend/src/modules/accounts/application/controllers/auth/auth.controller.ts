import {
  REFRESH_TOKEN_PORT_IN_TOKEN,
  RefreshTokenPortIn,
} from '@/modules/accounts/ports/in/auth/refresh-token.port';
import {
  SIGN_IN_PORT_IN_TOKEN,
  SignInPortIn,
} from '@/modules/accounts/ports/in/auth/sign-in.port';
import { COOKIE_NAME } from '@/modules/shared/constants/cookie.constants';
import {
  FIFTEEN_MINUTES_IN_MS,
  SEVEN_DAYS_IN_MS,
} from '@/modules/shared/constants/time.constants';
import { setCookie } from '@/modules/shared/utils/cookie.util';
import {
  AuthSignInRequestDTO,
  AuthSignInResponseDTO,
} from '@milnatix-core/dtos';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface MyRequestCookies {
  access_token?: string;
  refresh_token?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SIGN_IN_PORT_IN_TOKEN) private readonly signInUseCase: SignInPortIn,
    @Inject(REFRESH_TOKEN_PORT_IN_TOKEN)
    private readonly refreshTokenUseCase: RefreshTokenPortIn,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInDTO: AuthSignInRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthSignInResponseDTO> {
    const {
      refreshToken,
      accessToken: acessToken,
      ...userData
    } = await this.signInUseCase.execute(signInDTO);
    setCookie(res, COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
      maxAge: SEVEN_DAYS_IN_MS,
    });
    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, acessToken, {
      maxAge: FIFTEEN_MINUTES_IN_MS,
    });
    if (userData.companies.length > 0) {
      setCookie(
        res,
        COOKIE_NAME.SELECTED_COMPANY_ID,
        userData.companies[0].id,
        {
          maxAge: SEVEN_DAYS_IN_MS,
        },
      );
    }
    return userData;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const reqRefreshToken = (req.cookies as MyRequestCookies).refresh_token;
    if (!reqRefreshToken) throw new UnauthorizedException();

    const { accessToken, refreshToken } =
      await this.refreshTokenUseCase.execute({
        refreshToken: reqRefreshToken,
      });

    setCookie(res, COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
      maxAge: SEVEN_DAYS_IN_MS,
    });
    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, accessToken, {
      maxAge: FIFTEEN_MINUTES_IN_MS,
    });
  }
}
