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

  getTransactions(account: IAccount): Observable<any> {
    return this.http.get('/api/v2/feed/account/'+account.accountUid+'/category/'+account.defaultCategory+'?changesSince=2017-01-01T00:00:00.000Z', this.getAuthHeader(account)).pipe(
      map( (resp:any)=> {
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