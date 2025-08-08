import { CreateCompanyRequestDTO } from '@/modules/accounts/application/dtos/company/create.request.dto';
import { CreateCompanyResponseDTO } from '@/modules/accounts/application/dtos/company/create.response.dto';
import { BaseUseCasePortIn } from '@/modules/shared/ports/in/base-usecase.port';

export const CREATE_COMPANY_PORT_IN_TOKEN = Symbol('CreateCompanyPortIn');

export type CreateCompanyPortIn = BaseUseCasePortIn<
  CreateCompanyRequestDTO,
  CreateCompanyResponseDTO
>;
