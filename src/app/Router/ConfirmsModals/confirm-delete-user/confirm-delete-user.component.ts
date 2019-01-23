import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';

export interface ConfirmModel {
  object: any;
}


@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.css']
})
export class ConfirmDeleteUserComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  object: any;

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
