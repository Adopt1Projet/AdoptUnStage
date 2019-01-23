import { Component, OnInit } from '@angular/core';
import { ActuService } from 'src/app/services/actu.service';
import { SimpleModalService } from 'ngx-simple-modal'
import { ConfirmComponent } from '../../../PageBoardEntreprise/confirm/confirm.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-actu-admin',
  templateUrl: './actu-admin.component.html',
  styleUrls: ['./actu-admin.component.css']
})
export class ActuAdminComponent implements OnInit {
  actus: [any];
  confirmResult = null;

  constructor(
    private alertService: AlertService,
    private actuService: ActuService,
    private SimpleModalService: SimpleModalService ) { }

  deleteActu(i) {
    this.actuService.deleteActu(i)
      .subscribe(
        data => {
        },
        error => console.log(error));
  }

  showConfirm(i) {
    this.SimpleModalService.addModal(ConfirmComponent)
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.alertService.success('L\'actualité a bien été supprimée.', true);
          this.deleteActu(i);
          this.reloadData();
        }
      });
  }

  reloadData() {
    setTimeout(() => {
      this.actuService.getActusList().subscribe((data) => {
        this.actus = data;
        this.actus.sort((actu, actu2) => actu2.id - actu.id);
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
