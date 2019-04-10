import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { AppConfig } from '../app.config';
import { DataService } from '../core/data.service';
import { ShowTransactionsService } from '../core/show-transactions.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  title: string;
  baseUrl: string;
  accounts: any[] = [] ;
  transactionsListed: boolean = false;

  constructor( private dataService: DataService, private showTransactionsService: ShowTransactionsService ) { }

  ngOnInit() {

  	this.dataService.getAccounts()
  	    .subscribe( (accounts:any[]) => this.accounts = accounts );
  }

  listTransactions( id: string ) {
    this.showTransactionsService.toggle( id );
  }

}
