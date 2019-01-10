import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-offre',
  templateUrl: './item-offre.component.html',
  styleUrls: ['./item-offre.component.css']
})
export class ItemOffreComponent implements OnInit {

  @Input() offre: any;

  constructor() { }


  ngOnInit() {
  }

}
