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
  CREATE_PRODUCT_PORT_IN_TOKEN,
  CreateProductPortIn,
} from '@/modules/chef-partner/ports/in/product/create.port';
import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import { CompanyGuard } from '@/modules/accounts/guards/company.guard';
import { CompanyId } from '@/modules/accounts/decoratos/company-id.decorator';
import {
  LIST_PRODUCT_PORT_IN_TOKEN,
  ListProductPortIn,
} from '@/modules/chef-partner/ports/in/product/list.port';
import {
  FormProductRequestDTO,
  SummaryProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
  UpdateProductRequestDTO,
} from '@milnatix-core/dtos';
import {
  DELETE_PRODUCT_PORT_IN_TOKEN,
  DeleteProductPortIn,
} from '@/modules/chef-partner/ports/in/product/delete.port';
import {
  GET_PRODUCT_DETAILS_PORT_IN_TOKEN,
  GetProductDetailsPortIn,
} from '@/modules/chef-partner/ports/in/product/get-details.port';
import {
  UPDATE_PRODUCT_PORT_IN_TOKEN,
  UpdateProductPortIn,
} from '@/modules/chef-partner/ports/in/product/update.port';

@UseGuards(AuthGuard, CompanyGuard)
@Controller('product')
export class ProductController {
  constructor(
    @Inject(CREATE_PRODUCT_PORT_IN_TOKEN)
    private readonly createProductUseCase: CreateProductPortIn,
    @Inject(LIST_PRODUCT_PORT_IN_TOKEN)
    private readonly listProductUseCase: ListProductPortIn,
    @Inject(DELETE_PRODUCT_PORT_IN_TOKEN)
    private readonly deleteProductUseCase: DeleteProductPortIn,
    @Inject(GET_PRODUCT_DETAILS_PORT_IN_TOKEN)
    private readonly getProductDetailsUseCase: GetProductDetailsPortIn,
    @Inject(UPDATE_PRODUCT_PORT_IN_TOKEN)
    private readonly updateProductUseCase: UpdateProductPortIn,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() productRequestDTO: FormProductRequestDTO,
    @CompanyId() companyId: string,
  ): Promise<SummaryProductResponseDTO> {
    return await this.createProductUseCase.execute({
      payload: productRequestDTO,
      companyId,
    });
  }

  @Get()
  public async list(
    @CompanyId() companyId: string,
  ): Promise<ListProductResponseDTO[]> {
    return await this.listProductUseCase.execute({ companyId });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute({ id });
  }

  @Get(':productId')
  public async getDetails(
    @Param('productId') id: string,
  ): Promise<ProductDetailsResponseDTO> {
    return await this.getProductDetailsUseCase.execute({
      id,
    });
  }

  @Patch(':productId')
  public async update(
    @Param('productId') productId: string,
    @Body() product: UpdateProductRequestDTO,
  ): Promise<SummaryProductResponseDTO> {
    return await this.updateProductUseCase.execute({
      id: productId,
      payload: product,
    });
  }
}
