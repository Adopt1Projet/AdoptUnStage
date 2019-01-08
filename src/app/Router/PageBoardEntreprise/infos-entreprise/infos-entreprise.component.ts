import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../../services/entreprise.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/services/custom-validators';
import { AlertService } from '../../../services/alert.service';




@Component({
  selector: 'app-infos-entreprise',
  templateUrl: './infos-entreprise.component.html',
  styleUrls: ['./infos-entreprise.component.css']
})
export class InfosEntrepriseComponent implements OnInit {

  public formUpdate: FormGroup;
  public formUpdatePassword: FormGroup;
  username;
  entreprise: any;


  constructor(private entrepriseService: EntrepriseService,
    private token: TokenStorageService,
    private alertService : AlertService,
    private fb: FormBuilder) {
    this.formUpdate = this.updateSignupForm();
    this.formUpdatePassword = this.updateSignupFormPassword();
  }


  ngOnInit() {
    this.username = this.token.getUsername();
    this.entrepriseService
      .getEntreprise(this.username)
      .subscribe(data => {
        this.entreprise = data;
        this.formUpdate.setValue({
          name: this.entreprise.name,
          prenom: this.entreprise.prenom,
          raisonSociale: this.entreprise.raisonSociale,
          secteur: this.entreprise.secteur,
          statut: this.entreprise.statut,
          siteWeb: this.entreprise.siteWeb,
          adresse: this.entreprise.adresse,
          ville: this.entreprise.ville,
          codePostal: this.entreprise.codePostal,
          logo: this.entreprise.logo,
          fonction: this.entreprise.fonction,
          tel: this.entreprise.tel,
          email: this.entreprise.email,
          confirmMail: this.entreprise.email
        });
      },
        error => console.log("erreur"));


  }

  updateSignupForm(): FormGroup {
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
        confirmMail: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ]
      },
      {
        // Vérifie si le mdp et l'email sont bien les mêmes
        validator: [
        CustomValidators.mailMatchValidator]
      }
    );
  }

  updateSignupFormPassword(): FormGroup {
    return this.fb.group(
      {
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
    if (this.formUpdate.value.email == null) { this.formUpdate.value.email = this.entreprise.email };
    this.formUpdate.value.username = this.formUpdate.value.email;
    this.entrepriseService.updateEntreprise(this.entreprise.id, this.formUpdate.value)
      .subscribe(
        data => {
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
        },
        error => {
          this.alertService.error("Une erreur est servenue. L'email renseigné est peut-être déjà utilisé.", true);
        });
        
  }

  onSubmitPassword(){
    this.entrepriseService.updateEntreprisePassword(this.entreprise.id, this.formUpdatePassword.value)
      .subscribe(
        data => {
          this.alertService.success('Votre mot de passe a bien été modifié !', true);
        },
        error => {
          this.alertService.error("Une erreur est servenue.", true);
        });
    this.formUpdatePassword.reset();
  }

}
