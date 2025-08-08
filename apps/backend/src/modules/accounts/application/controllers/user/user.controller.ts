import {
  CreateUserPortIn,
  CREATE_USER_PORT_IN_TOKEN,
} from '@/modules/accounts/ports/in/user/create.port';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserRequestDTO } from '../../dtos/user/create.request.dto';
import { AuthGuard } from '@/modules/accounts/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    @Inject(CREATE_USER_PORT_IN_TOKEN)
    private readonly createUserUseCase: CreateUserPortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() userDTO: CreateUserRequestDTO) {
    return await this.createUserUseCase.execute(userDTO);
  }
}
