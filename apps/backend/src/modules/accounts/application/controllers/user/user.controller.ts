import {
  CreateUserPortIn,
  CREATE_USER_PORT_IN_TOKEN,
} from '@/modules/accounts/ports/in/user/create.port';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  ListUsersResponseDTO,
} from '@milnatix-core/dtos';
import {
  LIST_USERS_PORT_IN_TOKEN,
  ListUsersPortIn,
} from '@/modules/accounts/ports/in/user/list.port';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    @Inject(CREATE_USER_PORT_IN_TOKEN)
    private readonly createUserUseCase: CreateUserPortIn,
    @Inject(LIST_USERS_PORT_IN_TOKEN)
    private readonly listUserUseCase: ListUsersPortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() userDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return await this.createUserUseCase.execute(userDTO);
  }

  @Get()
  public async list(): Promise<ListUsersResponseDTO[]> {
    return await this.listUserUseCase.execute();
  }
}
