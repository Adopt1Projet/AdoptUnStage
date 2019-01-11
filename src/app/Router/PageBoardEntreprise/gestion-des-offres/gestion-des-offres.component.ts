import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { Observable } from 'rxjs';
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component'
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent {
  confirmResult = null;
  offre: Offre;
  offres: any;
  username: string;
  
  @ViewChild(ModifierOffreComponent)
  editComp: ModifierOffreComponent;

  constructor(
    private SimpleModalService: SimpleModalService,
    private offreService: OffreService,
    private token: TokenStorageService,
    private router: Router) {
  }
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

  showConfirm(i) {
    console.log(i);
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteOffre(i);
          this.ngOnInit();
          location.reload();
        }

      });
  }

  public editOffre(offre) {
    this.editComp.formOffre.setValue({
      id: offre.id,
      titre: offre.titre,
      description: offre.description,
      dateDebut: offre.dateDebut,
      dateFin: offre.dateFin,
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