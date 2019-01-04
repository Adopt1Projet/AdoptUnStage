import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { CustomValidators } from '../../../services/custom-validators';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-formulaire-inscription-stagiaire',
  templateUrl: './formulaire-inscription-stagiaire.component.html',
  styleUrls: ['./formulaire-inscription-stagiaire.component.css']
})
export class FormulaireInscriptionStagiaireComponent implements OnInit {
  public formCreate: FormGroup;
  loading = false;

  constructor(
    private stagiaireService: StagiaireService,
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.formCreate = this.createSignupForm();
  }

  ngOnInit() {
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        prenom: [
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

  retourPage() {
    this._location.back();
  }
  onSubmit() {
    const stagiaire: Stagiaire = this.formCreate.value;
    this.loading = true;
    stagiaire.username = stagiaire.email;
    this.stagiaireService.createStagiaire(stagiaire)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success("Merci de t'être enregistré, maintenant connecte toi !", true);
        },
        error => {
          console.log(error);
          this.loading = false;
        });

    this.router.navigate(['../connexion']);
  }
}
