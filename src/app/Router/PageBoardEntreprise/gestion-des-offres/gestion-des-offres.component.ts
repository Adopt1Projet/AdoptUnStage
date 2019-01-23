import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OffreService } from "src/app/services/offre.service";
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component'
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../confirm/confirm.component';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent {
  confirmResult = null;
  offres: any;
  username: string;
  dateDebutOK: string;

  @ViewChild(ModifierOffreComponent)
  editComp: ModifierOffreComponent;

  constructor(
    private alertService: AlertService,
    private SimpleModalService: SimpleModalService,
    private offreService: OffreService,
    private token: TokenStorageService) {
  }

  deleteOffre(i) {
    this.offreService.deleteOffre(i)
      .subscribe(
        data => {
          this.alertService.success('Votre offre a bien été supprimée.', true);
        },
        error => console.log(error));
  }


  showConfirm(i) {
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.deleteOffre(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.offreService.getOffresList(this.username).subscribe((data) => {
        this.offres = data;
        this.offres.sort((offre, offre2) => offre2.id - offre.id);
        for (let i = 0; i < this.offres.length; i++) {
          this.offres[i].dateDebut = moment(this.offres[i].dateDebut).format("DD/MM/YYYY");
          this.offres[i].dateFin = moment(this.offres[i].dateFin).format("DD/MM/YYYY");
        }
      });
    }, 100);
  }
  
  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  ngOnChanges() {
    this.reloadData();
  }
}