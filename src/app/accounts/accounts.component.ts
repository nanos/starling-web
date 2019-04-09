import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../app.config';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  title: string;
  baseUrl: string;

  constructor() { }

  ngOnInit() {
	this.baseUrl = AppConfig.settings.starling_url
  	this.title = 'Account';
  }

}
