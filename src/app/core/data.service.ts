import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConfig } from '../app.config';
import { IAccount, ITransaction } from '../models/interfaces.model';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getAuthHeader( account: IAccount ) {
    return{
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+account.api_key
      })
    };
  }

  getAccounts( api_key: string) : Observable<any> {
    const account = {api_key : api_key} as IAccount;
    return this.http.get('/api/v2/accounts', this.getAuthHeader(account)).pipe(
      map( (resp:any) => {
        const accounts: IAccount[] = [];
        for( let acc of resp.accounts ) {
          acc.api_key = api_key
          this.getAccountIdentifiers(acc).subscribe((identifiers:any[]) => acc.identifiers = identifiers);
          this.getAccountBalances(acc).subscribe((balances:any[]) => acc.balances = balances);
          this.getAccountHolder(acc).subscribe((holder:any[]) => acc.holder = holder);
          accounts.push(acc);
        }
        return accounts;
      }),
      catchError(this.handleError)
    );
  }

  getAccountIdentifiers(account: IAccount): Observable<any>{
    return this.http.get('/api/v2/accounts/'+account.accountUid+'/identifiers', this.getAuthHeader(account)).pipe(
      catchError(this.handleError)
    );
  }

  getAccountHolder(account: IAccount): Observable<any> {
    return this.http.get('/api/v2/account-holder/name', this.getAuthHeader(account)).pipe(
      catchError(this.handleError)
    );
  }

  getAccountBalances(account: IAccount): Observable<any>{
    return this.http.get('/api/v2/accounts/'+account.accountUid+'/balance', this.getAuthHeader(account)).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(account): Observable<any> {
    // map of types to icon
    const icons = {
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
    return this.http.get('/api/v2/feed/account/'+account.accountUid+'/category/'+account.defaultCategory, this.getAuthHeader(account)).pipe(
      map( (resp:any)=> {
        resp.feedItems.map(function(item){
          item.icon = icons[item.source] || 'receipt';
        })
        return resp.feedItems;
      }),
      catchError(this.handleError)
    );

  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

}