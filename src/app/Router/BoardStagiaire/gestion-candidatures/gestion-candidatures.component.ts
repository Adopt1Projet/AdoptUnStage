import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';
import * as moment from 'moment';

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
        this.offres.sort((offre, offre2) => offre2.id - offre.id);
        for (let i = 0; i < this.offres.length; i++) {
          this.offres[i].dateDebut = moment(this.offres[i].dateDebut).format("DD/MM/YYYY");
          this.offres[i].dateFin = moment(this.offres[i].dateFin).format("DD/MM/YYYY");
        }
    })

    this.offreService.getOffresListStagiairePourvues(this.username)
      .subscribe(data => {
        this.offresPourvues = data;
        this.offresPourvues.sort((offre, offre2) => offre2.id - offre.id);
        for (let i = 0; i < this.offresPourvues.length; i++) {
          this.offresPourvues[i].dateDebut = moment(this.offresPourvues[i].dateDebut).format("DD/MM/YYYY");
          this.offresPourvues[i].dateFin = moment(this.offresPourvues[i].dateFin).format("DD/MM/YYYY");
        }
    })

  }

}
