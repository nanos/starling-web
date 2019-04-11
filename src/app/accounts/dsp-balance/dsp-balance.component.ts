import { Component, OnInit, Input } from '@angular/core';

import { IAmount } from '../../models/interfaces.model';

@Component({
  selector: 'app-dsp-balance',
  templateUrl: './dsp-balance.component.html',
  styleUrls: ['./dsp-balance.component.css']
})
export class DspBalanceComponent implements OnInit {

  private _balance: IAmount;
  private _label: string;
  
  @Input() get balance(): IAmount {
    return this._balance;
  }

  set balance(value: IAmount) {
    if (value) {
      this._balance = value;
    }
  }

  @Input() get label(): string {
    return this._label;
  }

  set label(value: string) {
    if (value) {
      this._label = value;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}