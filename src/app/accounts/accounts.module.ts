import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AccountsTransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [AccountsComponent, AccountsTransactionsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ],
  exports: [ AccountsComponent ]
})
export class AccountsModule { }
