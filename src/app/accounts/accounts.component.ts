import { Component, OnInit, Input } from '@angular/core';

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

  constructor( private dataService: DataService) { }

  ngOnInit() {

    this.baseUrl = AppConfig.settings.starling_url
  	this.title = 'Account';

  	this.dataService.getAccounts()
  	    .subscribe( (accounts:any[]) => this.accounts = accounts );
  }

}
