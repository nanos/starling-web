import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class ShowTransactionsService {

  isOpen = false;

  accountId: string;
  categoryId: string;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  setParams( id: string, category: string) {
    this.accountId = id;
    this.categoryId = category;

    console.log(this.accountId, this.categoryId);
  }

  getParams() {
    return {
      accountId: this.accountId,
      categoryId: this.categoryId
    }
  }

}