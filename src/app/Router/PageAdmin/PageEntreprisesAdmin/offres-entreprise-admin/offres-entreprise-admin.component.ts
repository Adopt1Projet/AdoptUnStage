import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component';
import { AlertService } from 'src/app/services/alert.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { OffreService } from 'src/app/services/offre.service';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offres-entreprise-admin',
  templateUrl: './offres-entreprise-admin.component.html',
  styleUrls: ['./offres-entreprise-admin.component.css']
})
export class OffresEntrepriseAdminComponent implements OnInit {

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
    private route: ActivatedRoute) {
  }
  // deleteOffres() {
  //   this.offreService.deleteAll()
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.reloadData();
  //       },
  //       error => console.log('ERROR: ' + error));
  // }

  deleteOffre(i) {
    this.offreService.deleteOffre(i)
      .subscribe(
        data => {
          console.log(data)
          this.alertService.success('Votre offre a bien été supprimée.', true);
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
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      const username = this.route.snapshot.params['username'];
    console.log(username);
      this.offreService.getOffresList(username).subscribe((data) => {
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
    this.reloadData();
  }

  ngOnChanges() {
    this.reloadData();
  }
}
