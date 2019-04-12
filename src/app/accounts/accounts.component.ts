import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { AppConfig } from '../app.config';
import { DataService } from '../core/data.service';
import { IAccount } from '../models/interfaces.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  title: string;
  baseUrl: string;
  accounts: IAccount[] = [] ;
  // to mantain order regardless of network conditions:
  // keep an array of access keys and sort the accounts by them
  order: string[] = [];

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    for( let key of AppConfig.settings.api_keys ) {
      
      // keep sequenc of api keys so we can sort by it
      this.order.push(key);

      this.dataService.getAccounts( key ).subscribe( (accounts:IAccount[]) => {
        this.accounts = this.accounts.concat(accounts);
        // now sort accounts;
        this.accounts.sort( (a:IAccount, b:IAccount) => {
          const aIndex = this.order.indexOf( a.api_key );
          const bIndex = this.order.indexOf( b.api_key );
          return aIndex - bIndex;
        })
      });
    }

  }

}
