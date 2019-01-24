import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { CustomValidators } from '../../../services/custom-validators';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConditionUtilisationComponent } from '../../ModalConditionUtilisation/condition-utilisation/condition-utilisation.component';

import { AlertService } from '../../../services/alert.service';
import { Observable } from 'rxjs';
import { CollegeService } from '../../../services/college.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-formulaire-inscription-stagiaire',
  templateUrl: './formulaire-inscription-stagiaire.component.html',
  styleUrls: ['./formulaire-inscription-stagiaire.component.css']
})
export class FormulaireInscriptionStagiaireComponent implements OnInit {
  public formCreate: FormGroup;
  colleges: Observable<any>;
  stagiaire: Stagiaire;
  loading = false;
  confirmResult = null;
  submitted = false;
  file: FileList;
  curentFile: File;
  info: any;

  constructor(
    private token: TokenStorageService,
    private stagiaireService: StagiaireService,
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private collegeService: CollegeService,
    private SimpleModalService: SimpleModalService

  ) {
    this.formCreate = this.createSignupForm();
  }

  get f() { return this.formCreate.controls; }

  isAdmin() {
    this.info = {
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()

    };
  }

  ngOnInit() {
    this.isAdmin()
    this.collegeService.getCollegesList()
      .subscribe(
        data => {
          this.colleges = data;
        });
  }

  showCgu() {
    this.SimpleModalService.addModal(ConditionUtilisationComponent, { closeOnClickOutside: true }, { closeOnEscape: true })
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.ngOnInit();
        }

      });
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        civilite: [
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
        ville: [
          null,
          Validators.compose([Validators.required])
        ],
        codePostal: [
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
             *  )
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

  onChange(event) {
    this.file = event.target.files;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formCreate.invalid) {
        ;
    }
    this.loading = true;

    const stagiaire: Stagiaire = this.formCreate.value;
    this.loading = true;
    stagiaire.username = stagiaire.email;
    this.stagiaireService.createStagiaire(stagiaire)
      .pipe(first())
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.stagiaireService.createFileStagiaire(stagiaire.username, this.curentFile)
              .subscribe(
                data2 => {
                  this.alertService
                    .success('Merci de t\'être enregistré ' + stagiaire.prenom + ', tu viens de recevoir un mail de confirmation. Maintenant connecte toi !', true);
                },
                error => {
                  this.alertService.success('Ton cv n\'a pas le bon format mais ton compte a bien été créé, tu viens de recevoir un mail de confirmation. Maintenant connecte toi !', true);
                });;
          }
              this.alertService
                .success('Vous avez bien créé le compte stagiaire ' + stagiaire.prenom + " " + stagiaire.name, true);
              this.router.navigate(['../admin/stagiaires/listestagiaires']);
            
            else {
              this.alertService
              .success('Merci de t\'être enregistré ' + stagiaire.prenom + ', tu viens de recevoir un mail de confirmation. Maintenant connecte toi !', true);
              this.router.navigate(['../connexion']);
            }
          }
        },
        error => {
          this.loading = false;
        });



  }

}
