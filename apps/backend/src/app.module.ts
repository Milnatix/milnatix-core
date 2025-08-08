import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountsModule } from './modules/accounts/application/accounts.module';
import { ChefPartnerModule } from './modules/chef-partner/application/chef-partner.module';

@Module({
  imports: [
    AccountsModule,
    ChefPartnerModule,
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountsModule,
      },
      {
        path: 'chef-partner',
        module: ChefPartnerModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
