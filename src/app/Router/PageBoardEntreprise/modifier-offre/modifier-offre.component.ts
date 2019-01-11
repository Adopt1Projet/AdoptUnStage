import { Component, OnInit, Input } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private offre: any;
  private submitForm: boolean = false;


  constructor(
    private offreService: OffreService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
    this.formOffre = this.updateOffreForm();
  }

  onSubmit() {

    console.log(this.formOffre.value);
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

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.id = params.id;
      console.log(params);
      console.log(params['id'])
    })
    this.offreService
      .getOffre(this.id)
      .subscribe(data => {
        this.offre = data;
        console.log(this.offre);
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
          Validators.compose([Validators.required])
        ],
        description: [
          null,
          Validators.compose([Validators.required])
        ],
        dateDebut: [
          null,
        ],
        dateFin: [
          null,
        ],
        active: [
          null,
        ],
        rue: [
          null,
          Validators.compose([Validators.required])
        ],
        ville: [
          null,
          Validators.compose([Validators.required])
        ],
        codePostal: [
          null,
          Validators.compose([Validators.required])
        ],

      },
    );
  }

}
