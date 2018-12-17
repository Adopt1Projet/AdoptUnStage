import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TokenStorageService} from '../../../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../../../auth/login-info';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent implements OnInit {

  formulaireConnexion = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
​

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,) { }

  submitFormulaireConnexion() {
    this.loginInfo = this.formulaireConnexion.value;

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;

        this.roles = this.tokenStorage.getAuthorities();
        window.location.reload();
        this.router.navigate(['../partenaires']);       
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    console.log(this.formulaireConnexion.value);
  }


  ngOnInit() {
  }

}
