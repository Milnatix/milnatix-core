import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountsModule } from './modules/accounts/application/accounts.module';
import { ChefPartnerModule } from './modules/chef-partner/application/chef-partner.module';
import { FinancialModule } from './modules/finacial/application/financial.module';

@Module({
  imports: [
    AccountsModule,
    ChefPartnerModule,
    FinancialModule,
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountsModule,
      },
      {
        path: 'chef-partner',
        module: ChefPartnerModule,
      },
      {
        path: 'financial',
        module: FinancialModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
