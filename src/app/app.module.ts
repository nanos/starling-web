import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';


import { AppConfig } from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
