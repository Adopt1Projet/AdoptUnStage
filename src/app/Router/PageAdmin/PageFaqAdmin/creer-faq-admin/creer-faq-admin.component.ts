import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaqService } from 'src/app/services/faq.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Faq } from 'src/app/modeles/faq';

@Component({
  selector: 'app-creer-faq-admin',
  templateUrl: './creer-faq-admin.component.html',
  styleUrls: ['./creer-faq-admin.component.css']
})
export class CreerFaqAdminComponent implements OnInit {
  username: string;
  public formFaq: FormGroup;
  loading = false;
  submitted = false;
  constructor(private actuService: FaqService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService) { }

  get f() { return this.formFaq.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const faq: Faq = this.formFaq.value;

    if (this.formFaq.invalid) {
      return;
    }
    this.router.navigate(['../admin/faq/listefaq']);
    this.actuService.createFaq(this.username, faq)
      .subscribe(data => {
        console.log(data),
          this.alertService.success('Votre question réponse à bien été créée. Vous pouvez la modifier si nécessaire.', true);
      }, error => console.log(error));
    Object.keys(this.formFaq.controls).forEach(key => {
      this.formFaq.controls[key].setErrors(null)
    });
  }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.formFaq = this.fb.group({
      question: [
        '',
        Validators.required
      ],
      reponse: [
        '',
        Validators.required
      ],
    })
  }

}
