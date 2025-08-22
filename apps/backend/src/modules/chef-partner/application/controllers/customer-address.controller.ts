import {
  CreateCustomerAddressRequestDTO,
  SummaryCustomerAddressDTO,
  UpdateCustomerAddressRequestDTO,
} from '@milnatix-core/dtos';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  LIST_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
  ListCustomerAddressPortIn,
} from '../../ports/in/customer-address/list.port';
import {
  CREATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
  CreateCustomerAddressPortIn,
} from '../../ports/in/customer-address/create.port';
import {
  GET_CUSTOMER_ADDRESS_DETAILS_PORT_IN,
  GetCustomerAddressDetailsPortIn,
} from '../../ports/in/customer-address/get-detais.port';
import {
  UPDATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
  UpdateCustomerAddressPortIn,
} from '../../ports/in/customer-address/update.port';

@Controller('customer/:customerId/address')
export class CustomerAddressController {
  constructor(
    @Inject(LIST_CUSTOMER_ADDRESS_PORT_IN_TOKEN)
    private listCustomerAddressUseCase: ListCustomerAddressPortIn,
    @Inject(CREATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN)
    private createCustomerAddressUseCase: CreateCustomerAddressPortIn,
    @Inject(UPDATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN)
    private updateCustomerAddressUseCase: UpdateCustomerAddressPortIn,
    @Inject(GET_CUSTOMER_ADDRESS_DETAILS_PORT_IN)
    private getCustomerAddressDetailsUseCase: GetCustomerAddressDetailsPortIn,
  ) {}

  @Get()
  public async list(
    @Param('customerId') customerId: string,
  ): Promise<SummaryCustomerAddressDTO[]> {
    return await this.listCustomerAddressUseCase.execute({ customerId });
  }

  @Post()
  public async create(
    @Body() address: CreateCustomerAddressRequestDTO,
    @Param('customerId') customerId: string,
  ) {
    return await this.createCustomerAddressUseCase.execute({
      payload: address,
      customerId,
    });
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() address: UpdateCustomerAddressRequestDTO,
    @Param('customerId') customerId: string,
  ): Promise<SummaryCustomerAddressDTO> {
    return await this.updateCustomerAddressUseCase.execute({
      id,
      customerId,
      payload: address,
    });
  }

  @Get(':id')
  public async getDetails(@Param('id') id: string) {
    return await this.getCustomerAddressDetailsUseCase.execute({
      id,
    });
  }
}
