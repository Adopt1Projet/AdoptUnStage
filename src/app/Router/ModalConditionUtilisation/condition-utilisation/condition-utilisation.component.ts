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

  cancel() {
    this.result = false;
    this.close();
  }
}
