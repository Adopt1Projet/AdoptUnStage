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
    this.entrepriseService
      .getEntreprise(this.username)
        .subscribe(data =>
          {this.entreprise = data;
           this.formCreate.value.name = this.entreprise.name;
          }, 
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

  onSubmit() {
    let entreprise: Entreprise = this.formCreate.value;
    if (this.formCreate.value.name == null) {this.formCreate.value.name = this.entreprise.name;}
    if (this.formCreate.value.prenom == null) {this.formCreate.value.prenom = this.entreprise.prenom;}
    if (this.formCreate.value.raisonSociale == null) {this.formCreate.value.raisonSociale = this.entreprise.raisonSociale;}
    if (this.formCreate.value.secteur == null) {this.formCreate.value.secteur = this.entreprise.secteur;}
    if (this.formCreate.value.statut == null) {this.formCreate.value.statut = this.entreprise.statut;}
    if (this.formCreate.value.siteWeb == null) {this.formCreate.value.siteWeb = this.entreprise.siteWeb;}
    if (this.formCreate.value.adresse == null) {this.formCreate.value.adresse = this.entreprise.adresse;}
    if (this.formCreate.value.ville == null) {this.formCreate.value.ville = this.entreprise.ville;}
    if (this.formCreate.value.codePostal == null) {this.formCreate.value.codePostal = this.entreprise.codePostal;}
    if (this.formCreate.value.logo == null) {this.formCreate.value.logo = this.entreprise.logo;}
    if (this.formCreate.value.fonction == null) {this.formCreate.value.fonction = this.entreprise.fonction;}
    if (this.formCreate.value.tel == null) {this.formCreate.value.tel = this.entreprise.tel;}
    if (this.formCreate.value.email == null) {this.formCreate.value.email = this.entreprise.email;}
    if (this.formCreate.value.password == null) {this.formCreate.value.password = this.entreprise.password;}
    entreprise.username = entreprise.email;
    console.log(this.formCreate.value);
    this.entrepriseService.updateEntreprise(this.entreprise.id, entreprise)
      .subscribe(
        data => {
          console.log("Mise à jour : " + data);
        },
        error => {
          console.log(error);
        });
  }

}
