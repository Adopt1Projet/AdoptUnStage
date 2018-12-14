import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-creer-offre',
  templateUrl: './formulaire-creer-offre.component.html',
  styleUrls: ['./formulaire-creer-offre.component.css']
})
export class FormulaireCreerOffreComponent implements OnInit {

    formulaireOffre = new FormGroup({
      intitule : new FormControl(null, [
        Validators.required
    ]),
      descriptif : new FormControl(),
      période : new FormControl(),
      adresse : new FormControl(),
      ville : new FormControl(),
      codepostale : new FormControl(),
    });
    submitOffre() {
      console.log(this.formulaireOffre.value);
  }



  constructor() { }

  ngOnInit() {
  }

}
