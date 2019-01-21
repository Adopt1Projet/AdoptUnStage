import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { AideService } from '../../../../services/aide.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/Router/PageBoardEntreprise/confirm/confirm.component';

@Component({
  selector: 'app-liste-aide-admin',
  templateUrl: './liste-aide-admin.component.html',
  styleUrls: ['./liste-aide-admin.component.css']
})
export class ListeAideAdminComponent implements OnInit {
  aides: [any];
  confirmResult = null;

  constructor(
    private alertService: AlertService,
    private aideService: AideService,
    private SimpleModalService: SimpleModalService ) { }

  /* deleteAide(i) {
    this.aideService.deleteAide(i)
      .subscribe(
        data => {
          console.log(data)
        },
      error => console.log(error));
  }
 */
  /* showConfirm(i) {
    console.log(i);
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.alertService.success('L\'information d\'aide a bien été supprimée.', true);
          this.deleteAide(i);
          this.reloadData();
        }
      });
  } */

  reloadData() {
    setTimeout(() => {
      this.aideService.getAidesList().subscribe((data) => {
        this.aides = data;
        this.aides.sort((actu, actu2) => actu2.id - actu.id);
      });
    }, 100);
  }

  ngOnInit() {
    this.reloadData();
  }

  /* ngOnChanges() {
    this.reloadData();
  } */

}
