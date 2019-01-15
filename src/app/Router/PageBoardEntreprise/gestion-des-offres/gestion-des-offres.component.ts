import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OffreService } from "src/app/services/offre.service";
import { ModifierOffreComponent } from 'src/app/Router/PageBoardEntreprise/modifier-offre/modifier-offre.component'
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent {
  confirmResult = null;
  offres: any;
  username: string;

  @ViewChild(ModifierOffreComponent)
  editComp: ModifierOffreComponent;

  constructor(
    private SimpleModalService: SimpleModalService,
    private offreService: OffreService,
    private token: TokenStorageService) {
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
      this.offreService.getOffresList(this.username).subscribe((data) => {
        this.offres = data;
        this.offres.sort((offre, offre2) => offre2.id - offre.id);
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