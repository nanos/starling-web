import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class ShowTransactionsService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle( id: string ) {
    this.change.emit(id);
  }

}