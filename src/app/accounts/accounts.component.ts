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

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    for( let key of AppConfig.settings.api_keys ) {
      this.dataService.getAccounts( key )
          .subscribe( (accounts:IAccount[]) => {
            for( let acc of accounts ) {
              acc.api_key = key;
              this.accounts.push(acc);
            }
          });
    }

  }

}
