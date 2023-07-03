import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  quotes: Array<Quote> = new Array<Quote>();

  constructor(private db: AngularFireDatabase) {
    
    db.list<Quote>('quotes').valueChanges().subscribe(t => {
      this.quotes = t;
    })
  }

  addQuote(quotes: Quote) {
    this.db.list('quotes').push(quotes)
  }
}
