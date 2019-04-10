import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { AppConfig } from '../app.config';
import { DataService } from '../core/data.service';

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

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    for( let key of AppConfig.settings.api_keys ) {
    	this.dataService.getAccounts( key )
    	    .subscribe( (accounts:any[]) => {
            for( let acc of accounts ) {
              acc.api_key = key;
              this.accounts.push(acc);
            }
          });
    }

  }

  listTransactions( id: string ) {
    this.showTransactionsService.toggle( id );
  }

}
