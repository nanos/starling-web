import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';
import { ShowTransactionsService } from './show-transactions.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ DataService, ShowTransactionsService ]
})
export class CoreModule { }