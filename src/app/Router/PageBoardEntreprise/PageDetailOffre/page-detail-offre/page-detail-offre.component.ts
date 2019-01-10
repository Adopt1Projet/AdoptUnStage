import { Component, OnInit } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-page-detail-offre',
  templateUrl: './page-detail-offre.component.html',
  styleUrls: ['./page-detail-offre.component.css']
})
export class PageDetailOffreComponent implements OnInit {

  offres: any;
  username: string;

  constructor(private offreService: OffreService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername()
    console.log(this.offres)

  }

}
