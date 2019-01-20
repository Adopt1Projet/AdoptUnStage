import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Offre } from 'src/app/modeles/offre';
import { AlertService } from 'src/app/services/alert.service';

export interface ConfirmModel {
  offre: Offre;
  offres: any;
}

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  offre: Offre;
  offres: any;
  constructor( private alertService: AlertService,
  ) {
    super();
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
