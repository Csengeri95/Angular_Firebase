import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  actualQuote: string = '';
  actualAuthor: string = '';

  constructor(public service: QuoteService, private auth: AuthService) { }


  add() {
    let q = new Quote();
    q.quote = this.actualQuote;
    q.author = this.actualAuthor;
    q.currentUser = this.auth.currentUser();
    this.service.addQuote(q);
    this.actualQuote = '';
    this.actualAuthor = '';

  }

}
