import { Component, OnInit, Input,EventEmitter, HostListener } from '@angular/core';

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

    this.baseUrl = AppConfig.settings.starling_url
  	this.title = 'Account';

  	this.dataService.getAccounts()
  	    .subscribe( (accounts:any[]) => this.accounts = accounts );

    this.showTransactionsService.change.subscribe(transactionsListed => {
      this.transactionsListed = transactionsListed;
      console.log('transactionsListed?', this.transactionsListed);
    });
  }

  listTransactions( id: string, category: string) {
    console.log('listing', id, category);
    this.showTransactionsService.setParams( id, category );
    this.showTransactionsService.toggle();
    // this.transactionsListed = ! this.transactionsListed;
  }

}
