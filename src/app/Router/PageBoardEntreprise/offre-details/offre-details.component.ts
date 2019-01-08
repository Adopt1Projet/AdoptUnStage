import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";

import { GestionDesOffresComponent } from 'src/app/Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';

@Component({
  selector: 'offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.css']
})
export class OffreDetailsComponent implements OnInit {

  @Input() offre: Offre;

  constructor(private offreService: OffreService, private listComponent: GestionDesOffresComponent) { }

  updateActive(isActive: boolean) {
    this.offreService.updateOffre(this.offre.id,
      { titre: this.offre.titre, description: this.offre.description, active: isActive })
      .subscribe(
        data => {
          console.log(data);
          this.offre = data as Offre;
        },
        error => console.log(error));
  }

  deleteOffre() {
    this.offreService.deleteOffre(this.offre.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }
  ngOnInit() {
  }
}