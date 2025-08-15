import { SharedModule } from '@/modules/shared/application/shared.module';
import { Module, Provider } from '@nestjs/common';
import { ProductController } from './controller/product/product.controller';
import { CREATE_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/create.port';
import { CreateProductUseCase } from './usecases/product/create.usecase';
import { PRODUCT_REPOSITORY_PORT_TOKEN } from '../ports/out/product-repository.port';
import { PrismaProductRepositoryAdapter } from '../adapters/prisma/product-repository.adapter';
import { AccountsModule } from '@/modules/accounts/application/accounts.module';
import { LIST_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/list.port';
import { ListProductUseCase } from './usecases/product/list.usecase';
import { DELETE_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/delete.port';
import { DeleteProductUseCase } from './usecases/product/delete.usecase';

const useCases: Provider[] = [
  {
    provide: CREATE_PRODUCT_PORT_IN_TOKEN,
    useClass: CreateProductUseCase,
  },
  {
    provide: LIST_PRODUCT_PORT_IN_TOKEN,
    useClass: ListProductUseCase,
  },
  {
    provide: DELETE_PRODUCT_PORT_IN_TOKEN,
    useClass: DeleteProductUseCase,
  },
];

const adapters: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY_PORT_TOKEN,
    useClass: PrismaProductRepositoryAdapter,
  },
];

@Module({
  providers: [...useCases, ...adapters],
  controllers: [ProductController],
  imports: [SharedModule, AccountsModule],
})
export class ChefPartnerModule {}
