import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaqService } from 'src/app/services/faq.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Faq } from 'src/app/modeles/faq';

@Component({
  selector: 'app-modifier-faq-admin',
  templateUrl: './modifier-faq-admin.component.html',
  styleUrls: ['./modifier-faq-admin.component.css']
})
export class ModifierFaqAdminComponent implements OnInit {
  id: number;
  public formFaq: FormGroup;
  public question: any;
  private submitForm: boolean = false;
  loading = false;
  submitted = false;

  constructor(private faqService: FaqService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { this.formFaq = this.updateFaqForm() }

  onSubmit() {

    this.submitted = true;
    this.loading = true;
    const faq: Faq = this.formFaq.value;
    if (this.formFaq.invalid) {
      return;
    }
    this.submitForm = true;
    /*  if (this.formActu.value.titre == null) { this.formActu.value.titre = this.actu.titre };
     *  if (this.formActu.value.description == null) { this.formActu.value.description = this.actu.description };
     *  if (this.formActu.value.rue == null) { this.formActu.value.rue = this.actu.rue };
     *  if (this.formActu.value.ville == null) { this.formActu.value.ville = this.actu.ville };
     *  if (this.formActu.value.codePostal == null) { this.formActu.value.codePostal = this.actu.codePostal };
     *  if (this.formActu.value.dateDebut == null) { this.formActu.value.dateDebut = this.actu.dateDebut };
     *  if (this.formActu.value.dateFin == null) { this.formActu.value.dateFin = this.actu.dateFin }; */
    this.faqService.updateFaq(this.question.id, this.formFaq.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. Veuillez vérifier les informations entrées.', true);
        });
    this.router.navigate(['../admin/faq/listefaq']);
  }

  retourPage() {
    this.location.back();
  }

  get f() { return this.formFaq.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.id = params.id;

    })
    this.faqService
      .getQuestion(this.id)
      .subscribe(data => {
        this.question = data;
        this.formFaq.setValue({
          question: this.question.question,
          reponse: this.question.reponse,
        });
      },
        error => console.log("Une erreur est survenue."));
  }

  updateFaqForm(): FormGroup {
    return this.fb.group(
      {
    question: [
      '',
      Validators.required
    ],
    reponse: [
      '',
      Validators.required
    ]
  })
  }

}
