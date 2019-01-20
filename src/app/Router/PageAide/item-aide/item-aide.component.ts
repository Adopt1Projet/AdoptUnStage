import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-aide',
  templateUrl: './item-aide.component.html',
  styleUrls: ['./item-aide.component.css']
})
export class ItemAideComponent implements OnInit {

  @Input() aide: any;

  constructor() { }

  ngOnInit() {
  }

}
