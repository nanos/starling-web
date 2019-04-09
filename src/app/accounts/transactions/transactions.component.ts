import { Component, OnInit, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';
import { ShowTransactionsService } from '../../core/show-transactions.service';

@Component({
  selector: 'app-accounts-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AccountsTransactionsComponent implements OnInit {
	private _accounts: any[] = [];
  accounts: any[] = [];
  transactions: any[] = [];
	@Input() get accounts(): any[] {
		return this._accounts;
	}

	set accounts(value: any[]) {
		if (value) {
			this._accounts = value;
		}
	}

  @HostBinding('class.is-open')
  isOpen = false;


  constructor(private dataService: DataService, private showTransactionsService: ShowTransactionsService) { }

  ngOnInit() {
  	this.showTransactionsService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      console.log( this.showTransactionsService.getParams() );
      
      this.dataService.getTransactions(this.showTransactionsService.getParams().accountId, this.showTransactionsService.getParams().categoryId)
          .subscribe( (transactions:any[]) => this.transactions = transactions );
    });
  }



  listTransactions( id: string, category: string) {
    console.log('listing transactions', id, category);
  }

}
