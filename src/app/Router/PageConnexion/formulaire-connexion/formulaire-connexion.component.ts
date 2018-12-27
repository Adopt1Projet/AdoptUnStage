import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {

  public formConnect: FormGroup;

  // formulaireConnexion = new FormGroup({
  //   mail: new FormControl(null, [Validators.required]),
  //   motDePasse: new FormControl(null, [Validators.required])
  // });


  constructor(private fb: FormBuilder) {
    this.formConnect = this.connectForm();
  }

  connectForm(): FormGroup {
    return this.fb.group(
      {
        mail: [
          null,
          Validators.compose([Validators.required]),
          Validators.compose([Validators.required])
        ],
        motDePasse: [
          null,
          Validators.compose([Validators.required])
        ]
      }
    )
  }

  submitFormulaireConnexion() {
    console.log(this.formConnect.value);
  }

  ngOnInit() {
  }

}
