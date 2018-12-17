import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  constructor() { }

  authenticate(credentials, callback) {
    if (credentials && credentials.eMail == 'user' && credentials.motDePasse == 'password') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return callback && callback();
  }

}
