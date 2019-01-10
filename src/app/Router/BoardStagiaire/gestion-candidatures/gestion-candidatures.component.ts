import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';

@Component({
  selector: 'app-gestion-candidatures',
  templateUrl: './gestion-candidatures.component.html',
  styleUrls: ['./gestion-candidatures.component.css']
})
export class GestionCandidaturesComponent implements OnInit {

  offres : Offre[];
  offresPourvues: Offre[];
  username : string;

  constructor(private token : TokenStorageService, 
              private offreService : OffreService) { }

  ngOnInit() {
    this.username = this.token.getUsername();

    this.offreService.getOffresListStagiaire(this.username)
      .subscribe(data => {
        this.offres = data;
    })

    this.offreService.getOffresListStagiairePourvues(this.username)
      .subscribe(data => {
        this.offresPourvues = data;
    })

  }

}
