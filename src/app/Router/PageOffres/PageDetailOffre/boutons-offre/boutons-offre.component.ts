import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { Location } from '@angular/common';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-boutons-offre',
  templateUrl: './boutons-offre.component.html',
  styleUrls: ['./boutons-offre.component.css']
})
export class BoutonsOffreComponent implements OnInit {

  isStagiaire = false;
  info: any;

  @Input() offre: Offre;
  public role: any;
  username: any;
  offresStagiaire: any;
  hasPostuled: boolean = false;


  constructor(private token: TokenStorageService,
    private location: Location,
    private offreService: OffreService) { }

  retourPage() {
    this.location.back();
  }

  ngOnInit() {
    this.role = this.token.getAuthorities();
    this.username = this.token.getUsername();

    if (this.role[0] == 'ROLE_STAGIAIRE') {
    this.offreService.getOffresListStagiaire(this.username)
      .subscribe(data => {
        this.offresStagiaire = data;
        for (let i = 0; i < this.offresStagiaire.length; i++) {
          if (this.offresStagiaire[i].id
            == this.offre.id) {
            this.hasPostuled = true;
          }
        }
      })
    }
  }
}
