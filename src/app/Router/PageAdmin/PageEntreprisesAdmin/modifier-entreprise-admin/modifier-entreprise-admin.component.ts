import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/services/custom-validators';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-modifier-entreprise-admin',
  templateUrl: './modifier-entreprise-admin.component.html',
  styleUrls: ['./modifier-entreprise-admin.component.css']
})
export class ModifierEntrepriseAdminComponent implements OnInit {

  public formUpdate: FormGroup;
  public formUpdatePassword: FormGroup;
  file : FileList;
  private username;
  curentFile : File;
  public entreprise: any;
  private submitForm: boolean = false;
  private submitFormPassword: boolean = false;

  constructor(
    private entrepriseService: EntrepriseService,
    private token: TokenStorageService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.formUpdate = this.updateSignupForm();
    this.formUpdatePassword = this.updateSignupFormPassword();

  }


  ngOnInit() {
    const username = this.route.snapshot.params['username'];
    this.entrepriseService
      .getEntreprise(username)
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
          //logo: this.entreprise.logo,
          civilite: this.entreprise.civilite,
          contactMail: this.entreprise.contactMail,
          description: this.entreprise.description,
          tel: this.entreprise.tel,
          email: this.entreprise.email,
          confirmMail: this.entreprise.email
        });
      },
        error => console.log("Une erreur est survenue."));


  }


  updateSignupForm(): FormGroup {
    return this.fb.group(
      {
        siteWeb: [null],
        // logo: [null],
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
        confirmMail: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ]
      },
      {
        validator: [CustomValidators.mailMatchValidator]
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
        validator: [CustomValidators.passwordMatchValidator]
      }
    );
  }

  onChange(event) {
    this.file = event.target.files;
  }

  onSubmit() {
    this.submitFormPassword = false;
    this.submitForm = true;
    if (this.formUpdate.value.email == null) { this.formUpdate.value.email = this.entreprise.email };
    this.formUpdate.value.username = this.formUpdate.value.email;
    this.entrepriseService.updateEntreprise(this.entreprise.id, this.formUpdate.value)
      .subscribe(
        data => {
          if (this.file != undefined){
            this.curentFile = this.file.item(0);
            this.entrepriseService.createFileEntreprise(this.formUpdate.value.username, this.curentFile)
              .subscribe(
                  data2 => {
                    this.alertService.success('Votre logo et vos autres modifications ont bien été prises en compte !', true);
                  },
                  error => {
                    this.alertService.error('Votre logo n\'a pas le bon format mais vos autres modifications ont bien été prises en compte !', true);
                  });;
            }
          this.alertService.success('Vos modifications ont bien été prises en compte !', true);
          this.router.navigate(['../admin/entreprises/listeentreprises']);
        },
        error => {
          this.alertService.error('Une erreur est servenue. L\'email renseigné est peut-être déjà utilisé.', true);
        });

    document.body.scrollTop = 230; // For Safari
    document.documentElement.scrollTop = 230; // For Chrome, Firefox, IE and Opera

  }

  onSubmitPassword() {
    this.submitForm = false;
    this.submitFormPassword = true;
    this.entrepriseService.updateEntreprisePassword(this.entreprise.id, this.formUpdatePassword.value)
      .subscribe(
        data => {
          this.alertService.success('Votre mot de passe a bien été modifié !', true);
        },
        error => {
          this.alertService.error('Une erreur est servenue.', true);
        });
    this.formUpdatePassword.reset();

    document.body.scrollTop = 230; // For Safari
    document.documentElement.scrollTop = 230; // For Chrome, Firefox, IE and Opera
  }
}
