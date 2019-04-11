import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppConfig } from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsModule } from './accounts/accounts.module';
// import { TransactionsModule } from './transactions/transactions.module';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AccountsModule
  ],
  providers: [
    AppConfig, { 
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], 
      multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
