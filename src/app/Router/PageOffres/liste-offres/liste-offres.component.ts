import { Component, OnInit, ViewChild } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/modeles/offre';
import * as moment from 'moment';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {

  offres: Offre[];
  page: number;
  taillePage: number;

  constructor(private offreService: OffreService) { }

  ngOnInit() {
    this.page = 0;
    this.taillePage = 5;
    this.offreService.getAllOffres().subscribe
      (data => { this.offres = data;
                 this.offres.sort((offre, offre2) => offre2.id - offre.id);
                  for (let i = 0; i < this.offres.length; i++) {
                    this.offres[i].dateDebut = moment(this.offres[i].dateDebut).format("DD/MM/YYYY");
                    this.offres[i].dateFin = moment(this.offres[i].dateFin).format("DD/MM/YYYY");
                }
      });
  }

  increasePage() {
    this.page++;
  }

  decreasePage() {
    this.page--;
  }

  getPage() {
    const debut = this.page*this.taillePage;
    const fin = Number(this.taillePage) + Number(this.page*this.taillePage);
    return this.offres.slice(debut,fin);
  }
}