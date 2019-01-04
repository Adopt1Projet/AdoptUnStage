import { Component, OnInit } from '@angular/core';

import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulaire-creer-offre',
  templateUrl: './formulaire-creer-offre.component.html',
  styleUrls: ['./formulaire-creer-offre.component.css']
})
export class FormulaireCreerOffreComponent implements OnInit {

  formOffre = new FormGroup({
    titre: new FormControl(),
    description: new FormControl(),
    période: new FormControl(),
    rue: new FormControl(),
    ville: new FormControl(),
    codePostal: new FormControl(),
  });
  constructor(private offreService: OffreService) { }

  onSubmit() {
    const offre: Offre = Object.assign({}, this.formOffre.value);
    this.offreService.createOffre(offre)
      .subscribe(data => console.log(data), error => console.log(error));
    this.formOffre.reset();
  }

  ngOnInit() {
  }

}
