import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface CguModal {
  
}
@Component({
  selector: 'condition-utilisation',
  templateUrl: './condition-utilisation.component.html',
  styleUrls: ['./condition-utilisation.component.css']
})
export class ConditionUtilisationComponent extends SimpleModalComponent<CguModal, boolean> implements CguModal {
  constructor() { super(); }

  ngOnInit() {
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
