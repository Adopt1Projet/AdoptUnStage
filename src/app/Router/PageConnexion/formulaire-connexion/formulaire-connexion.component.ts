import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {

  formulaireConnexion = new FormGroup({
    eMail: new FormControl(null, [Validators.required]),
    motDePasse: new FormControl(null, [Validators.required])
  });
​

  constructor() { }

  submitFormulaireConnexion() {
    console.log(this.formulaireConnexion.value);
  }

  ngOnInit() {
  }

}
