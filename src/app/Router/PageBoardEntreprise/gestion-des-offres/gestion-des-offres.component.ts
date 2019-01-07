import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { Observable } from 'rxjs';
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component'

@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent implements OnInit {

  @Input() offre: Offre;
  offres: Observable<Offre[]>;

  @ViewChild(ModifierOffreComponent)
  editComp: ModifierOffreComponent;

  constructor(private offreService: OffreService) { }

  deleteOffres() {
    this.offreService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }
  deleteOffre() {
    this.offreService.deleteOffre(this.offre.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  public editOffre(offre) {
    this.editComp.formOffre.setValue({
      id: offre.id,
      titre: offre.titre,
      description: offre.description,
      rue: offre.rue,
      ville: offre.ville,
      codePostal: offre.codePostal
    });

  }
  reloadData() {
    this.offres = this.offreService.getOffresList();
  }
  ngOnInit() {
    this.reloadData();
  }
}
