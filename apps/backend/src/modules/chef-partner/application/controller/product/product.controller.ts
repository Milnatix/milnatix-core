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
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ListProductResponseDTO,
} from '@milnatix-core/dtos';
import {
  DELETE_PRODUCT_PORT_IN_TOKEN,
  DeleteProductPortIn,
} from '@/modules/chef-partner/ports/in/product/delete.port';

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
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() productRequestDTO: CreateProductRequestDTO,
    @CompanyId() companyId: string,
  ): Promise<CreateProductResponseDTO> {
    const productInputDTO = ProductMapper.createRequestToCreateInputDTO(
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
}
