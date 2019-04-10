import { Component, OnInit, Input, HostBinding } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {}

  listTransactions() {
    this.isOpen = !this.isOpen;
    
    this.dataService.getTransactions(this.account)
        .subscribe( (transactions:any[]) => this.transactions = this.filteredTransactions = transactions );
  }

  filter(data: string) {
        if (data) {
            this.filteredTransactions = this.transactions.filter((trans) => {
                console.log(trans.counterPartyName, data, trans.counterPartyName.toLowerCase().indexOf(data.toLowerCase()));
                return trans.counterPartyName.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       trans.reference.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       trans.amount.minorUnits === data * 100 ;
            });
        } else {
            this.filteredTransactions = this.transactions;
        }
    }

}
