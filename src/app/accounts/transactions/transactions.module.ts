import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ],
  exports: [ TransactionsComponent ]
})
export class TransactionsModule { }
