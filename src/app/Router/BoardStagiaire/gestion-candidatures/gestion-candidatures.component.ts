import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-gestion-candidatures',
  templateUrl: './gestion-candidatures.component.html',
  styleUrls: ['./gestion-candidatures.component.css']
})
export class GestionCandidaturesComponent implements OnInit {

  offres : any;
  username : string;

  constructor(private token : TokenStorageService, private offreService : OffreService) { }

  ngOnInit() {
    this.username = this.token.getUsername();

    this.offreService.getOffresListStagiaire(this.username).subscribe((data) => {
      this.offres = data
      console.log(this.offres)
    });
  }

}
