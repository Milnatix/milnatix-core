import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CREATE_PRODUCT_PORT_IN_TOKEN,
  CreateProductPortIn,
} from '@/modules/chef-partner/ports/in/product/create.port';
import { AuthGuard } from '@/modules/accounts/guards/auth.guard';
import { CompanyGuard } from '@/modules/accounts/guards/company.guard';
import { CompanyId } from '@/modules/accounts/decoratos/company-id.decorator';
import { ProductMapper } from '../../mappers/product.mapper';
import { LIST_PRODUCT_PORT_IN_TOKEN } from '@/modules/chef-partner/ports/in/product/list.port';
import { ListProductUseCase } from '../../usecases/product/list.usecase';
import {
  FormProductRequestDTO,
  FormProductResponseDTO,
  ListProductResponseDTO,
  ProductDetailsResponseDTO,
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
    private readonly listProductUseCase: ListProductUseCase,
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
  ): Promise<FormProductResponseDTO> {
    const productInputDTO = ProductMapper.formRequestToCreateInputDTO(
      productRequestDTO,
      companyId,
    );
    return await this.createProductUseCase.execute(productInputDTO);
  }

  @Get()
  public async list(
    @CompanyId() companyId: string,
  ): Promise<ListProductResponseDTO[]> {
    return await this.listProductUseCase.execute({ companyId });
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('productId') productId: string): Promise<void> {
    await this.deleteProductUseCase.execute({ productId });
  }

  @Get(':productId')
  public async getDetails(
    @Param('productId') productId: string,
    @CompanyId() companyId: string,
  ): Promise<ProductDetailsResponseDTO> {
    return await this.getProductDetailsUseCase.execute({
      productId,
      companyId,
    });
  }

  @Put(':productId')
  public async update(
    @Param('productId') productId: string,
    @CompanyId() companyId: string,
    @Body() product: FormProductRequestDTO,
  ): Promise<FormProductResponseDTO> {
    return await this.updateProductUseCase.execute({
      ...product,
      id: productId,
      companyId,
    });
  }
}
