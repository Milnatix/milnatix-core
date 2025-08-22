import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import { CompanyGuard } from '@/modules/accounts/guards/company.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CREATE_CUSTOMER_PORT_IN_TOKEN,
  CreateCustomerPortIn,
} from '../../ports/in/customer/create.port';
import {
  CreateCustomerRequestDTO,
  CustomerDetailResponseDTO,
  CustomerSummaryDTO,
  UpdateCustomerRequestDTO,
} from '@milnatix-core/dtos';
import { CompanyId } from '@/modules/accounts/decoratos/company-id.decorator';
import {
  LIST_CUSTOMER_PORT_IN_TOKEN,
  ListCustomerPortIn,
} from '../../ports/in/customer/list.port';
import {
  GET_CUSTOMER_DETAILS_PORT_IN_TOKEN,
  GetCustomerDetailsPortIn,
} from '../../ports/in/customer/detail.port';
import {
  UPDATE_CUSTOMER_PORT_IN_TOKEN,
  UpdateCustomerPortIn,
} from '../../ports/in/customer/update.port';
import {
  DELETE_CUSTOMER_PORT_IN_TOKEN,
  DeleteCustomerPortIn,
} from '../../ports/in/customer/delete.port';

@UseGuards(AuthGuard, CompanyGuard)
@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CREATE_CUSTOMER_PORT_IN_TOKEN)
    private readonly createCustomerUseCase: CreateCustomerPortIn,
    @Inject(LIST_CUSTOMER_PORT_IN_TOKEN)
    private readonly listCustomerUseCase: ListCustomerPortIn,
    @Inject(GET_CUSTOMER_DETAILS_PORT_IN_TOKEN)
    private readonly getCustomerDetailsUseCase: GetCustomerDetailsPortIn,
    @Inject(UPDATE_CUSTOMER_PORT_IN_TOKEN)
    private readonly updateCustomerUseCase: UpdateCustomerPortIn,
    @Inject(DELETE_CUSTOMER_PORT_IN_TOKEN)
    private readonly deleteCustomerUseCase: DeleteCustomerPortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() customerRequestDTO: CreateCustomerRequestDTO,
    @CompanyId() companyId: string,
  ): Promise<CustomerSummaryDTO> {
    return await this.createCustomerUseCase.execute({
      payload: customerRequestDTO,
      companyId,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(
    @CompanyId() companyId: string,
  ): Promise<CustomerSummaryDTO[]> {
    return await this.listCustomerUseCase.execute({ companyId });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getDetails(
    @Param('id') id: string,
  ): Promise<CustomerDetailResponseDTO> {
    return await this.getCustomerDetailsUseCase.execute({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() customerRequestDTO: UpdateCustomerRequestDTO,
  ): Promise<CustomerSummaryDTO> {
    return await this.updateCustomerUseCase.execute({
      id,
      payload: customerRequestDTO,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.deleteCustomerUseCase.execute({ id });
  }
}
