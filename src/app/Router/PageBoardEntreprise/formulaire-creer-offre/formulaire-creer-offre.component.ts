import { Component, OnInit, Input } from '@angular/core';

import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/services/custom-validators';

import { FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-formulaire-creer-offre',
  templateUrl: './formulaire-creer-offre.component.html',
  styleUrls: ['./formulaire-creer-offre.component.css']
})
export class FormulaireCreerOffreComponent implements OnInit {

  // @Input() formData: any = [];
  username: string;

  formOffre = new FormGroup({
    titre: new FormControl(),
    description: new FormControl(),
    dateDebut: new FormControl(),
    dateFin: new FormControl(),
    // période: new FormControl(),
    rue: new FormControl(),
    ville: new FormControl(),
    codePostal: new FormControl(),
  });
  constructor(
    private offreService: OffreService,
    private token: TokenStorageService,
    private alertService: AlertService) { }

  onSubmit() {
    const offre: Offre = this.formOffre.value;
    console.log(offre);
    this.alertService.success('Votre annonce a bien été créée. Vous pouvez la modifier dans l\'onglet "Gestion des annonces".', true);
    this.offreService.createOffre(this.username, offre)
      .subscribe(data => console.log(data), error => console.log(error));
    this.formOffre.reset();
  }

  ngOnInit() {
    this.username = this.token.getUsername();

  }

}
