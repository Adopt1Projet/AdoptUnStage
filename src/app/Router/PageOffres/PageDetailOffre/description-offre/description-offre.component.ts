import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';

@Component({
  selector: 'app-description-offre',
  templateUrl: './description-offre.component.html',
  styleUrls: ['./description-offre.component.css']
})
export class DescriptionOffreComponent implements OnInit {

  @Input() offre: Offre;

  constructor() { }

  ngOnInit() {
  }

}
