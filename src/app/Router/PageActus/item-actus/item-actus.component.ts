import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-actus',
  templateUrl: './item-actus.component.html',
  styleUrls: ['./item-actus.component.css']
})
export class ItemActusComponent implements OnInit {

  @Input() actu: any;

  constructor() { }

  ngOnInit() {
  }

}
