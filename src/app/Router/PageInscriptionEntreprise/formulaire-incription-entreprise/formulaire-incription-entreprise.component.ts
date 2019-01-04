import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';
import { CustomValidators } from '../../../services/custom-validators';

@Component({
  selector: 'app-formulaire-incription-entreprise',
  templateUrl: './formulaire-incription-entreprise.component.html',
  styleUrls: ['./formulaire-incription-entreprise.component.css']
})
export class FormulaireIncriptionEntrepriseComponent implements OnInit {


  public formCreate: FormGroup;

  // formCreate = new FormGroup({
  //   raisonSociale: new FormControl(null, [Validators.required]),
  //   secteur: new FormControl(null, [Validators.required]),
  //   statutEntreprise: new FormControl(null, [Validators.required]),
  //   siteWeb: new FormControl(null),
  //   adresse: new FormControl(null, [Validators.required]),
  //   ville: new FormControl(null),
  //   codePostal: new FormControl(null, [Validators.required]),
  //   logo: new FormControl(null),
  //   prenom: new FormControl(null, [Validators.required]),
  //   nom: new FormControl(null, [Validators.required]),
  //   fonction: new FormControl(null),
  //   tel: new FormControl(null),
  //   mail: new FormControl(null, [Validators.required]),
  //   mail2: new FormControl(null, [Validators.required]),
  //   mdp: new FormControl(null, [Validators.required]),
  //   mdp2: new FormControl(null, [Validators.required])
  //   });

  constructor(private entrepriseService: EntrepriseService, private _location: Location, private fb: FormBuilder) {
    this.formCreate = this.createSignupForm();
   }

  retourPage() {
    this._location.back();
  }

  ngOnInit() {
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        siteWeb: [null],
        logo: [null],
        fonction: [null],
        raisonSociale: [
          null,
          Validators.compose([Validators.required])
        ],
        secteur: [
          null,
          Validators.compose([Validators.required])
        ],
        statut: [
          null,
          Validators.compose([Validators.required])
        ],
        adresse: [
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
        prenom: [
          null,
          Validators.compose([Validators.required])
        ],
        name: [
          null,
          Validators.compose([Validators.required])
        ],
        tel: [
          null,
          Validators.compose([Validators.required])
        ],
        email: [
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

 
  onSubmit(){
    const entreprise: Entreprise = this.formCreate.value;
    entreprise.username = entreprise.email;
    this.entrepriseService.createEntreprise(entreprise)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }

}
