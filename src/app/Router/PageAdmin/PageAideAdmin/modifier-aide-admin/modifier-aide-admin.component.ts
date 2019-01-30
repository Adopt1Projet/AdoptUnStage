import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { AideService } from '../../../../services/aide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Aide } from '../../../../modeles/aide';

@Component({
  selector: 'app-modifier-aide-admin',
  templateUrl: './modifier-aide-admin.component.html',
  styleUrls: ['./modifier-aide-admin.component.css']
})

export class ModifierAideAdminComponent implements OnInit {
  id: number;
  public formAide: FormGroup;
  public aide: any;
  private submitForm: boolean = false;
  loading = false;
  submitted = false;

  constructor(
    private aideService: AideService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { this.formAide = this.updateAideForm() }

  onSubmit() {

  this.submitted = true;
    this.loading = true;
    const aide: Aide = this.formAide.value;
    if (this.formAide.invalid) {
      return;
    }
    this.submitForm = true;

    this.aideService.updateAide(this.aide.id, this.formAide.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. Veuillez vérifier les informations entrées.', true);
        });
    this.router.navigate(['../admin/aide/listeaide']);
  }
  

  retourPage() {
    this.location.back();
  }

  get f() { return this.formAide.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.id = params.id;

    })
    this.aideService
      .getAide(this.id)
      .subscribe(data => {
        this.aide = data;
        this.formAide.setValue({
          titre: this.aide.titre,
          intertitre: this.aide.intertitre,
          texte: this.aide.texte,
          lien: this.aide.lien
        });
      },
        error => console.log("Une erreur est survenue."));
  }

  updateAideForm(): FormGroup {
    return this.fb.group(
      {
    titre: [
      ''
    ],
    intertitre: [
      ''
    ],
    texte: [
      ''
    ],
    lien: [
      ''
    ]
    })
  }

}
