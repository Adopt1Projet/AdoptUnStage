import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../../../auth/login-info';


@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loading = false;
  private loginInfo: AuthLoginInfo;
  public formConnect: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
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

        if (this.roles[0] == "ROLE_STAGIAIRE") { this.router.navigate(['../boardstagiaire']); }
        if (this.roles[0] == "ROLE_ENTREPRISE") { this.router.navigate(['../boardentreprise']); }

        window.location.reload();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.loading = false;
      }
    );

  }


  ngOnInit() {
  }

}
