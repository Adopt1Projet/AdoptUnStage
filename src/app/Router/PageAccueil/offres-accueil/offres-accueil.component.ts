import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-offres-accueil',
  templateUrl: './offres-accueil.component.html',
  styleUrls: ['./offres-accueil.component.css']
})
export class OffresAccueilComponent implements OnInit {

  offres: [any];

  constructor(private offreService: OffreService) { }

  ngOnInit() {
    this.offreService.getAllOffres()
      .subscribe(data => {this.offres = data;
                          this.offres.sort((offre, offre2) => offre2.id - offre.id);
                         });   
  };

}
