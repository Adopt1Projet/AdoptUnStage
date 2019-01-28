import { Component, OnInit, Input } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

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
    /*  if (this.formOffre.value.titre == null) { this.formOffre.value.titre = this.offre.titre };
     *  if (this.formOffre.value.description == null) { this.formOffre.value.description = this.offre.description };
     *  if (this.formOffre.value.rue == null) { this.formOffre.value.rue = this.offre.rue };
     *  if (this.formOffre.value.ville == null) { this.formOffre.value.ville = this.offre.ville };
     *  if (this.formOffre.value.codePostal == null) { this.formOffre.value.codePostal = this.offre.codePostal };
     *  if (this.formOffre.value.dateDebut == null) { this.formOffre.value.dateDebut = this.offre.dateDebut };
     *  if (this.formOffre.value.dateFin == null) { this.formOffre.value.dateFin = this.offre.dateFin }; */
    this.offreService.updateOffre(this.offre.id, this.formOffre.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue. Veuillez vérifier les informations entrées.', true);
        });
    this.router.navigate(['../boardentreprise/gestionoffres']);
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
          active : this.offre.active,
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
