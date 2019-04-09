import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConfig } from '../app.config';


@Injectable()
export class DataService {

    baseUrl: string = AppConfig.settings.starling_url;
    
    constructor(private http: HttpClient) { }

    getAccounts() : Observable<any> {
      return this.http.get('/api/v2/accounts')
          .pipe(
            map( resp => {
              let accounts = [];
              for( let acc of resp.accounts ) {
                this.getAccountIdentifiers(acc.accountUid).subscribe((identifiers:any[]) => acc.identifiers = identifiers);
                this.getAccountBalances(acc.accountUid).subscribe((balances:any[]) => acc.balances = balances);
                this.getAccountHolder(acc.accountUid).subscribe((holder:any[]) => acc.holder = holder);
                accounts.push(acc);
              }
              console.log(accounts);

              return accounts;
            }),
            catchError(this.handleError)
          );
    }

    getAccountIdentifiers(id: string): Observable<any>{
      return this.http.get('/api/v2/accounts/'+id+'/identifiers')
      .pipe(
        catchError(this.handleError)
      );
    }

    getAccountHolder(id: string): Observable<any> {
      return this.http.get('/api/v2/account-holder/name')
      .pipe(
        catchError(this.handleError)
      );
    }

    getAccountBalances(id: string): Observable<any>{
      return this.http.get('/api/v2/accounts/'+id+'/balance')
      .pipe(
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