import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../../services/entreprise.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/services/custom-validators';
import { Entreprise } from 'src/app/modeles/entreprise';



@Component({
  selector: 'app-infos-entreprise',
  templateUrl: './infos-entreprise.component.html',
  styleUrls: ['./infos-entreprise.component.css']
})
export class InfosEntrepriseComponent implements OnInit {

  public formCreate: FormGroup;
  loading = false;
  username;
  entreprise : any;


  constructor(private entrepriseService : EntrepriseService, 
              private token : TokenStorageService,
              private fb : FormBuilder) {
                this.formCreate = this.createSignupForm();
               }


  ngOnInit() {
    this.username = this.token.getUsername();
    this.entrepriseService.getEntreprise(this.username).subscribe(data =>{ this.entreprise = data;
                                                                           console.log(this.entreprise);}, 
                                                                           error => console.log(error));;
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
      },
      {
        // Vérifie si le mdp et l'email sont bien les mêmes
        validator: [CustomValidators.passwordMatchValidator]
      }
    );
  }

  onSubmit() {
    let entreprise: Entreprise = this.formCreate.value;
    this.loading = true;
    this.entrepriseService.updateEntreprise(21, entreprise)
      .subscribe(
        data => {
          console.log("Mise à jour : " + data);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

}
