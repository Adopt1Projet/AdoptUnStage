import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';
import { CustomValidators } from '../../../services/custom-validators';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConditionUtilisationComponent } from '../../ModalConditionUtilisation/condition-utilisation/condition-utilisation.component';


import { AlertService } from '../../../services/alert.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-formulaire-incription-entreprise',
  templateUrl: './formulaire-incription-entreprise.component.html',
  styleUrls: ['./formulaire-incription-entreprise.component.css']
})
export class FormulaireIncriptionEntrepriseComponent implements OnInit {
  public formCreate: FormGroup;
  file: FileList;
  curentFile: File;
  loading = false;
  submitted = false;
  confirmResult = null;
  info: any;

  constructor(
    private token: TokenStorageService,
    private entrepriseService: EntrepriseService,
    private _location: Location,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private SimpleModalService: SimpleModalService,
  ) {
    this.formCreate = this.createSignupForm();
  }

  ngOnInit() {
    this.isAdmin()
  }

  isAdmin() {
    this.info = {
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()

    };
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        siteWeb: [null],
        contactMail: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        description: [null],
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

  get f() { return this.formCreate.controls; }


  showCgu() {
    console.log();
    this.SimpleModalService.addModal(ConditionUtilisationComponent, { closeOnClickOutside: true }, { closeOnEscape: true })
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.ngOnInit();
        }

      });
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
      return;
    }
    this.loading = true;
    console.log(this.formCreate)
    const entreprise: Entreprise = this.formCreate.value;
    this.loading = true;
    entreprise.username = entreprise.email;
    this.entrepriseService.createEntreprise(entreprise)
      .pipe(first())
      .subscribe(
        data => {
          if (this.file != undefined) {
            this.curentFile = this.file.item(0);
            this.entrepriseService.createFileEntreprise(entreprise.username, this.curentFile)
              .subscribe(
                data2 => {
                  console.log(data2)
                },
                error => {
                  this.alertService.success('Votre logo n\'a pas le bon format mais votre compte a bien été créé, vous venez de recevoir un mail de confirmation. Vous pouvez vous connecter.', true);
                });;
          }
          if (this.info.authorities == "ROLE_ADMIN") {
            this.alertService
              .success('Vous avez bien créé le compte entreprise ' + entreprise.email, true);
          }
          else {
          this.alertService.success('Merci de vous être enregistré, vous venez de recevoir un mail de confirmation. Vous pouvez vous connecter.', true);
          }
          if (this.info.authorities == "ROLE_ADMIN") {
            this.router.navigate(['../admin/entreprises/listeentreprises']);
          }
          else { this.router.navigate(['../connexion']); }
        },
        error => {
          console.log(error);
          this.loading = false;
        });

    this.router.navigate(['../connexion']);
  }

}
