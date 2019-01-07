import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
>>>>>>> 7a357d1b24b87b1a503e3066fbe2151f50aee014
import { AuthService } from '../../../auth/auth.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../../../auth/login-info';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {
<<<<<<< HEAD
  public formConnect: FormGroup;

  // formulaireConnexion = new FormGroup({
  //   username: new FormControl(null, [Validators.required]),
  //   password: new FormControl(null, [Validators.required])
  // });


  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

=======

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loading = false;
  private loginInfo: AuthLoginInfo;
  public formConnect: FormGroup;

>>>>>>> 7a357d1b24b87b1a503e3066fbe2151f50aee014
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
<<<<<<< HEAD
=======
    private alertService: AlertService,
>>>>>>> 7a357d1b24b87b1a503e3066fbe2151f50aee014
    private fb: FormBuilder
  ) {
    this.formConnect = this.connectForm();
  }

  connectForm(): FormGroup {
    return this.fb.group(
      {
        username: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          Validators.compose([Validators.required])
        ]
      }
    )
  }
<<<<<<< HEAD
=======




>>>>>>> 7a357d1b24b87b1a503e3066fbe2151f50aee014

  submitFormulaireConnexion() {
    this.loginInfo = this.formConnect.value;
    this.loading = true;
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;

        this.roles = this.tokenStorage.getAuthorities();
<<<<<<< HEAD
        window.location.reload();
        this.router.navigate(['../partenaires']);
=======

        if (this.roles[0] == "ROLE_STAGIAIRE") {  this.router.navigate(['../boardstagiaire/gestionstagiaire']); }
        if (this.roles[0] == "ROLE_ENTREPRISE") { this.router.navigate(['../boardentreprise']); }
        setTimeout(function() {
          window.location.reload();
        }, 1);
        
>>>>>>> 7a357d1b24b87b1a503e3066fbe2151f50aee014
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.loading = false;
      }
    );

  }

  ngOnInit() {}
}
