import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendEmailService } from 'src/app/services/mail.service';
import { Email } from 'src/app/modeles/email'
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-formulaire-contact',
  templateUrl: './formulaire-contact.component.html',
  styleUrls: ['./formulaire-contact.component.css']
})
export class FormulaireContactComponent implements OnInit {

  public formContact: FormGroup;
  loading = false;

  constructor(
    private mailService: SendEmailService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.formContact = this.createContactForm();
  }

  ngOnInit() {
  }

  createContactForm(): FormGroup {
    return this.fb.group(
      {

        title: [
          null,
          Validators.compose([Validators.required])
        ],
        message: [
          null,
          Validators.compose([Validators.required])
        ],
        prenom: [
          null,
          Validators.compose([Validators.required])
        ],
        name: [
          null,
          Validators.compose([Validators.required])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ]
      });
  }

  onSubmit() {
    const email: Email = this.formContact.value;
    this.loading = true;
    this.alertService.success('Votre message a bien été envoyé. Nous vous enverrons une réponse au plus vite.', true);
    this.mailService.sendMail(email)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
        this.formContact.reset();
  }


}
