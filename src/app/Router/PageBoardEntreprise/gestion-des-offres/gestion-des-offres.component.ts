import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { Observable } from 'rxjs';
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component'
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent implements OnInit {

  offre: Offre;
  offres: any;
  username: string;

  @ViewChild(ModifierOffreComponent)
  editComp: ModifierOffreComponent;

  constructor(private offreService: OffreService, private token: TokenStorageService) { }

  deleteOffres() {
    this.offreService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }
  deleteOffre(i) {
    this.offreService.deleteOffre(i)
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
    console.log('REFRESHING DATA !')
    this.offreService.getOffresList(this.username).subscribe((data) => {
      this.offres = data
      console.log(this.offres)
    });
  }
  ngOnInit() {
    this.username = this.token.getUsername();

    this.reloadData();

  }

}