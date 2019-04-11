import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { DataService } from '../../core/data.service';
import { ITransaction, IAccount } from '../../models/interfaces.model';

@Component({
  selector: 'app-accounts-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AccountsTransactionsComponent implements OnInit {
  // map of types to icon
  icons = {
    'MASTER_CARD' : 'credit-card',
    'MASTERCARD_MONEYSEND' : 'credit-card',
    'MASTERCARD_CHARGEBACK' : 'credit-card',
    'STRIPE_FUNDING' : 'plus-circle',
    'STARLING_PAY_STRIPE' : 'plus-circle',
    'CASH_DEPOSIT' : 'money-bill-wave',
    'CASH_WITHDRAWAL' : 'money-bill-wave',
    'CHAPS' : 'university',
    'CURRENCY_CLOUD' : 'university',
    'DIRECT_CREDIT' : 'university',
    'DIRECT_DEBIT' : 'university',
    'DIRECT_DEBIT_DISPUTE' : 'university',
    'INTERNAL_TRANSFER' : 'university',
    'FASTER_PAYMENTS_IN' : 'university',
    'FASTER_PAYMENTS_OUT' : 'university',
    'FASTER_PAYMENTS_REVERSAL' : 'university',
    'FASTER_PAYMENTS_REFUND' : 'university',
    'SEPA_CREDIT_TRANSFER' : 'university',
    'SEPA_DIRECT_DEBIT' : 'university',
    'CASH_WITHDRAWAL_CHARGE': 'coins', 
    'CASH_DEPOSIT_CHARGE': 'coins', 
    'INTEREST_PAYMENT': 'percentage', 
    'OVERDRAFT': 'percentage', 
    'OVERDRAFT_INTEREST_WAIVED': 'percentage', 
    'LOAN_PRINCIPAL_PAYMENT': 'percentage', 
    'LOAN_REPAYMENT': 'percentage', 
    'LOAN_OVERPAYMENT': 'coins', 
    'LOAN_LATE_PAYMENT': 'coins'
  };

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
        .subscribe( (transactions:any[]) => this.transactions = this.filteredTransactions = transactions.map((trans) => {
          trans.icon = this.icons[trans.source] || 'receipt';
          return trans;
        }));
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
