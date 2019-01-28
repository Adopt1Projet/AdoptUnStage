import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modifier-offre-admin',
  templateUrl: './modifier-offre-admin.component.html',
  styleUrls: ['./modifier-offre-admin.component.css']
})
export class ModifierOffreAdminComponent implements OnInit {

  id: number;
  public formOffre: FormGroup;
  public offre: any;
  private submitForm: boolean = false;
  loading = false;
  submitted = false;


  constructor(
    private offreService: OffreService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.formOffre = this.updateOffreForm();
  }

  onSubmit() {

    this.submitted = true;
    this.loading = true;
    const offre: Offre = this.formOffre.value;
    if (this.formOffre.invalid) {
      return;
    }
    this.submitForm = true;
    this.offreService.updateOffre(this.offre.id, this.formOffre.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. Veuillez vérifier les informations entrées.', true);
        });
    this.router.navigate(['../admin/offres/listeoffres']);
  }

  retourPage() {
    this.location.back();
  }

  get f() { return this.formOffre.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.id = params.id;

    })
    this.offreService
      .getOffre(this.id)
      .subscribe(data => {
        this.offre = data;
        this.formOffre.setValue({
          titre: this.offre.titre,
          description: this.offre.description,
          dateDebut: this.offre.dateDebut,
          dateFin: this.offre.dateFin,
          active: this.offre.active,
          rue: this.offre.rue,
          ville: this.offre.ville,
          codePostal: this.offre.codePostal
        });
      },
        error => console.log("Une erreur est survenue."));
  }

  updateOffreForm(): FormGroup {
    return this.fb.group(
      {
        titre: [
          null,
          Validators.required
        ],
        description: [
          null,
          Validators.required
        ],
        dateDebut: [
          null,
          Validators.required
        ],
        dateFin: [
          null,
          Validators.required
        ],
        active: [
          null,
        ],
        rue: [
          null,
          Validators.required
        ],
        ville: [
          null,
          Validators.required
        ],
        codePostal: [
          null,
          Validators.required
        ],

      },
    );
  }

}
