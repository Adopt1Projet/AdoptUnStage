import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { CustomValidators } from '../../../services/custom-validators';

@Component({
  selector: 'app-formulaire-inscription-stagiaire',
  templateUrl: './formulaire-inscription-stagiaire.component.html',
  styleUrls: ['./formulaire-inscription-stagiaire.component.css']
})
export class FormulaireInscriptionStagiaireComponent implements OnInit {

  // formCreate = new FormGroup({
  //   prenom: new FormControl(null, [Validators.required]),
  //   nom: new FormControl(null, [Validators.required]),
  //   etablissement: new FormControl(null, [Validators.required]),
  //   ville: new FormControl(null),
  //   codePostal: new FormControl(null, [Validators.required]),
  //   tel: new FormControl(null), // Créer une fonction qui supprime les espaces entre les nombres.
  //   mail: new FormControl(null, [Validators.required]),
  //   mail2: new FormControl(null, [Validators.required]),
  //   mdp: new FormControl(null, [Validators.required]),
  //   mdp2: new FormControl(null, [Validators.required])
  //   });

  public formCreate: FormGroup;

  constructor(private stagiaireService: StagiaireService, private _location: Location, private fb: FormBuilder) {
    this.formCreate = this.createSignupForm();
   }

  ngOnInit() {
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        firstname: [
          null,
          Validators.compose([Validators.required])
        ],
        name: [
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
        tel: [
          null,
          Validators.compose([Validators.required])
        ],
        etablissement: [
          null,
          Validators.compose([Validators.required])
        ],
        mail: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        checkCgu: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            /* 
             * CustomValidators.patternValidator(
             *  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
             *  {
             *    hasSpecialCharacters: true
             *  }
             *  ), 
            */
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
        confirmMail: [
          null, 
          Validators.compose([Validators.email, Validators.required])
        ]
      },
      {
        // Vérifie si le mdp et l'email sont bien les mêmes
        validator: [CustomValidators.passwordMatchValidator,
        CustomValidators.mailMatchValidator]
      }
    );
  }

  retourPage() {
    this._location.back();
  }
   onSubmit() {
    const user: Stagiaire = Object.assign({}, this.formCreate.value);
    this.stagiaireService.createStagiaire(user)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }
}
