import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { Location } from '@angular/common';
import { TokenStorageService } from '../../../../auth/token-storage.service';

@Component({
  selector: 'app-boutons-offre',
  templateUrl: './boutons-offre.component.html',
  styleUrls: ['./boutons-offre.component.css']
})
export class BoutonsOffreComponent implements OnInit {

  isStagiaire = false;
  info: any;

  @Input() offre: Offre;

  constructor(private _location: Location,private token: TokenStorageService) { }

  
  retourPage() {
    this._location.back();
  }

  ngOnInit() {

    this.info = {
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()

    };

    if (this.info.authorities == "ROLE_STAGIAIRE") { this.isStagiaire = true; }
    else { this.isStagiaire = false; }
  }

}
