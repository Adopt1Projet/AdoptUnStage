import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../../auth/token-storage.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-bouton-inscription-accueil',
  templateUrl: './bouton-inscription-accueil.component.html',
  styleUrls: ['./bouton-inscription-accueil.component.css']
})
export class BoutonInscriptionAccueilComponent implements OnInit {
  isInfo = false;
  isEntreprise = false;
  isStagiaire = false;
  info: any;

  entreprise: Object;
  stagiaire: Object;

  constructor(private token: TokenStorageService,
    private entrepriseService: EntrepriseService,
    private stagiaireService: StagiaireService) { }

  isLogged() {
    this.info = {
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()

    };

    if (this.info.username != "" && this.info.username != null) { this.isInfo = true; }
    else { this.isInfo = false; }

    if (this.info.authorities[0] == "ROLE_STAGIAIRE") {
      this.isStagiaire = true;
      this.stagiaireService.getStagiaire(this.info.username)
        .subscribe(data => { this.stagiaire = data })
    }
    else { this.isStagiaire = false; }

    if (this.info.authorities[0] == "ROLE_ENTREPRISE") {
      this.isEntreprise = true;
      this.entrepriseService.getEntreprise(this.info.username)
        .subscribe(data => { this.entreprise = data })
    }
    else { this.isEntreprise = false; }
  }


  ngOnInit() {
    this.isLogged()
    console.log(this.isEntreprise)
  }

}
