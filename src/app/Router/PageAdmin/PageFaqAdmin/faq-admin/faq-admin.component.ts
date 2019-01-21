import { Component, OnInit, Input } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../../../PageBoardEntreprise/confirm/confirm.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-faq-admin',
  templateUrl: './faq-admin.component.html',
  styleUrls: ['./faq-admin.component.css']
})
export class FaqAdminComponent implements OnInit {
  questions: [any];
  confirmResult = null;

  constructor(
    private alertService: AlertService,
    private SimpleModalService: SimpleModalService,
    private faqService: FaqService) { }

  deleteFaq(i) {
    this.faqService.deleteFaq(i)
      .subscribe(
        data => {
          console.log(data)
        },
        error => console.log(error));
  }

  showConfirm(i) {
    console.log(i);
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.alertService.success('La question a bien été supprimée.', true);
          this.deleteFaq(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.faqService.getQuestionsList().subscribe((data) => {
        this.questions = data;
        this.questions.sort((question, question2) => question2.id - question.id);
      });
    }, 100);
  }

  ngOnInit() {
    this.reloadData();
  }

  ngOnChanges() {
    this.reloadData();
  }
}
