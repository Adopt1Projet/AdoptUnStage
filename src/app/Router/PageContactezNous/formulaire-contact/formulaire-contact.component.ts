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
  submitted = false;

  constructor(
    private mailService: SendEmailService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.formContact = this.fb.group({
      title: [
        '',
        Validators.required
      ],
      message: [
        '',
        Validators.required
      ],
      prenom: [
        '',
        Validators.required
      ],
      name: [
        '',
        Validators.required
      ],
      email: [
        '',
        [Validators.email, Validators.required]
      ]
    })
  }

  // createContactForm(): FormGroup {
  //   return this.fb.group(
  //     {


  //     });
  // }

  get f() { return this.formContact.controls; }

  onSubmit() {
    this.submitted = true;
    const email: Email = this.formContact.value;
    if (this.formContact.invalid) {
      return;
    }
    this.loading = true;
    
    this.alertService.success('Votre message a bien été envoyé. Nous vous enverrons une réponse au plus vite.', true);
    this.mailService.sendMail(email)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          console.log(error);
          this.loading = false;
        });
    this.formContact.reset();
    Object.keys(this.formContact.controls).forEach(key => {
      this.formContact.controls[key].setErrors(null)
    });
  }


}
