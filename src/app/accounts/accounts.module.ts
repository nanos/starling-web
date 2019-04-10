import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { SharedModule } from '../shared/shared.module';
import { AccountsTransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [AccountsComponent, AccountsTransactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule
  ],
  exports: [ AccountsComponent ]
})
export class AccountsModule { }
