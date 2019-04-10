import { NgModule } from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { SharedModule } from '../shared/shared.module';
import { AccountsTransactionsComponent } from './transactions/transactions.component';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  declarations: [AccountsComponent, AccountsTransactionsComponent, FilterTextboxComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AccountsRoutingModule
  ],
  exports: [ AccountsComponent ]
})
export class AccountsModule { }
