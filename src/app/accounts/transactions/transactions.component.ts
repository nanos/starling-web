import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { DataService } from '../../core/data.service';
import { ITransaction, IAccount } from '../../models/interfaces.model';

@Component({
  selector: 'app-accounts-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AccountsTransactionsComponent implements OnInit {
	private _account: IAccount;
  filteredTransactions: ITransaction[];

  transactions: ITransaction[] = [];
  
  @Input() get account(): IAccount {
		return this._account;
	}

	set account(value: IAccount) {
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
        .subscribe( (transactions:ITransaction[]) => this.transactions = this.filteredTransactions = transactions );
  }

  filter(data: string) {
        if (data) {
            this.filteredTransactions = this.transactions.filter((trans:ITransaction) => {
                return trans.counterPartyName.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       trans.reference.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       trans.amount.minorUnits == parseInt(data) * 100 ;
            });
        } else {
            this.filteredTransactions = this.transactions;
        }
    }

}
