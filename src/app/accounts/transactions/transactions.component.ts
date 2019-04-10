import { Component, OnInit, Input, Output, HostBinding } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';
import { ShowTransactionsService } from '../../core/show-transactions.service';

@Component({
  selector: 'app-accounts-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AccountsTransactionsComponent implements OnInit {
	private _account: any[] = [];
  account: any[] = [];
  transactions: any[] = [];
  isOpen: boolean = false;
	@Input() get account(): any[] {
		return this._account;
	}

	set account(value: any[]) {
		if (value) {
			this._account = value;
		}
	}

  @HostBinding('class.is-open') isOpen = false;



  constructor(private dataService: DataService, private showTransactionsService: ShowTransactionsService) { }

  ngOnInit() {
  	this.showTransactionsService.change.subscribe( accountUid => {
      // check we are using the current account
      if ( accountUid == this.account.accountUid ) {

        this.isOpen = !this.isOpen;
        
        this.dataService.getTransactions(this.account)
            .subscribe( (transactions:any[]) => this.transactions = transactions );
      }
     });
  }

  listTransactions( id: string, category: string) {
    console.log('listing transactions', id, category);
  }

}
