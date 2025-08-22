import { SharedModule } from '@/modules/shared/application/shared.module';
import { Module, Provider } from '@nestjs/common';
import { CREATE_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/create.port';
import { CreateProductUseCase } from './usecases/product/create.usecase';
import { PRODUCT_REPOSITORY_PORT_TOKEN } from '../ports/out/product-repository.port';
import { PrismaProductRepositoryAdapter } from '../adapters/prisma/product-repository.adapter';
import { AccountsModule } from '@/modules/accounts/application/accounts.module';
import { LIST_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/list.port';
import { ListProductUseCase } from './usecases/product/list.usecase';
import { DELETE_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/delete.port';
import { DeleteProductUseCase } from './usecases/product/delete.usecase';
import { GetProductDetailsUseCase } from './usecases/product/get-details.usecase';
import { GET_PRODUCT_DETAILS_PORT_IN_TOKEN } from '../ports/in/product/get-details.port';
import { UPDATE_PRODUCT_PORT_IN_TOKEN } from '../ports/in/product/update.port';
import { UpdateProductUseCase } from './usecases/product/update.usecase';
import { ProductController } from './controllers/product.controller';
import { CustomerController } from './controllers/customer.controller';
import { CREATE_CUSTOMER_PORT_IN_TOKEN } from '../ports/in/customer/create.port';
import { CreateCustomerUseCase } from './usecases/customer/create.usecase';
import { CUSTOMER_REPOSITORY_PORT_TOKEN } from '../ports/out/customer-repository.port';
import { PrismaCustomerRepositoryAdapter } from '../adapters/prisma/customer-repository.adapter';
import { CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN } from '../ports/out/customer-address-repository.port';
import { PrismaCustomerAddressRepositoryAdapter } from '../adapters/prisma/customer-address-repository.adapter';
import { LIST_CUSTOMER_PORT_IN_TOKEN } from '../ports/in/customer/list.port';
import { ListCusomerUseCase } from './usecases/customer/list.usecase';
import { GET_CUSTOMER_DETAILS_PORT_IN_TOKEN } from '../ports/in/customer/detail.port';
import { GetCustomerDetailUseCase } from './usecases/customer/detail.usecase';
import { UPDATE_CUSTOMER_PORT_IN_TOKEN } from '../ports/in/customer/update.port';
import { UpdateCustomerUseCase } from './usecases/customer/update.usecase';
import { DELETE_CUSTOMER_PORT_IN_TOKEN } from '../ports/in/customer/delete.port';
import { DeleteCustomerUseCase } from './usecases/customer/delete.usecase';
import { CustomerUniqueValidator } from './validators/customer/customer-unique.validator';
import { ProductUniqueValidator } from './validators/product/product-unique.validator';
import { CustomerAddressController } from './controllers/customer-address.controller';
import { CREATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN } from '../ports/in/customer-address/create.port';
import { CreateCustomerAddressUseCase } from './usecases/customer-address/create.usecase';
import { GET_CUSTOMER_ADDRESS_DETAILS_PORT_IN } from '../ports/in/customer-address/get-detais.port';
import { GetCustomerAddressDetailUseCase } from './usecases/customer-address/detail.usecase';
import { UPDATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN } from '../ports/in/customer-address/update.port';
import { UpdateCustomerAddressUseCase } from './usecases/customer-address/update.usecase';
import { DELETE_CUSTOMER_ADDRESS_PORT_IN_TOKEN } from '../ports/in/customer-address/delete.port';
import { DeleteCustomerAddressUseCase } from './usecases/customer-address/delete.usecase';
import { LIST_CUSTOMER_ADDRESS_PORT_IN_TOKEN } from '../ports/in/customer-address/list.port';
import { ListCustomerAddressUseCase } from './usecases/customer-address/list.usecase';
import { CustomerExistsValidator } from './validators/customer/customer-exists.validator';
import { UniqueAddressToCustomerValidator } from './validators/customer-address/unique-address-to-customer.validator';

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
  {
    provide: GET_PRODUCT_DETAILS_PORT_IN_TOKEN,
    useClass: GetProductDetailsUseCase,
  },
  {
    provide: UPDATE_PRODUCT_PORT_IN_TOKEN,
    useClass: UpdateProductUseCase,
  },
  {
    provide: CREATE_CUSTOMER_PORT_IN_TOKEN,
    useClass: CreateCustomerUseCase,
  },
  {
    provide: LIST_CUSTOMER_PORT_IN_TOKEN,
    useClass: ListCusomerUseCase,
  },
  {
    provide: GET_CUSTOMER_DETAILS_PORT_IN_TOKEN,
    useClass: GetCustomerDetailUseCase,
  },
  {
    provide: UPDATE_CUSTOMER_PORT_IN_TOKEN,
    useClass: UpdateCustomerUseCase,
  },
  {
    provide: DELETE_CUSTOMER_PORT_IN_TOKEN,
    useClass: DeleteCustomerUseCase,
  },
  {
    provide: CREATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
    useClass: CreateCustomerAddressUseCase,
  },
  {
    provide: GET_CUSTOMER_ADDRESS_DETAILS_PORT_IN,
    useClass: GetCustomerAddressDetailUseCase,
  },
  {
    provide: UPDATE_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
    useClass: UpdateCustomerAddressUseCase,
  },
  {
    provide: DELETE_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
    useClass: DeleteCustomerAddressUseCase,
  },
  {
    provide: LIST_CUSTOMER_ADDRESS_PORT_IN_TOKEN,
    useClass: ListCustomerAddressUseCase,
  },
];

const adapters: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY_PORT_TOKEN,
    useClass: PrismaProductRepositoryAdapter,
  },
  {
    provide: CUSTOMER_REPOSITORY_PORT_TOKEN,
    useClass: PrismaCustomerRepositoryAdapter,
  },
  {
    provide: CUSTOMER_ADDRESS_REPOSITORY_PORT_TOKEN,
    useClass: PrismaCustomerAddressRepositoryAdapter,
  },
];

const validators: Provider[] = [
  CustomerUniqueValidator,
  CustomerExistsValidator,
  ProductUniqueValidator,
  UniqueAddressToCustomerValidator,
];

@Module({
  providers: [...useCases, ...adapters, ...validators],
  controllers: [
    ProductController,
    CustomerController,
    CustomerAddressController,
  ],
  imports: [SharedModule, AccountsModule],
})
export class ChefPartnerModule {}
