import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/faq.service';
import { Observable } from 'rxjs';
import { Faq } from 'src/app/faq';

@Component({
  selector: 'app-liste-faq',
  templateUrl: './liste-faq.component.html',
  styleUrls: ['./liste-faq.component.css']
})
export class ListeFaqComponent implements OnInit {

  questions : Observable<Faq[]>

  constructor(private faqService : FaqService) { }

  ngOnInit() {
    this.questions = this.faqService.getQuestionsList();
  }

}
