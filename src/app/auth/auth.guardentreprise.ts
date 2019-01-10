import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable()
export class AuthGuardEntreprise implements CanActivate {

    info: any;
    isStagiaire = false;
    isEntreprise = false;

    constructor(private router: Router, private token: TokenStorageService) { }

    isLoggedEntreprise() {
        this.info = {
            username: this.token.getUsername(),
            authorities: this.token.getAuthorities()
        };

        if (this.info.authorities == "ROLE_ENTREPRISE") { return true; }
        else { return false; }


    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.isLoggedEntreprise() == true) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        else {
            this.router.navigate(['/non-connecte']);
        }

    }

}