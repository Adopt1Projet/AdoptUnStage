import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-description-offre',
  templateUrl: './description-offre.component.html',
  styleUrls: ['./description-offre.component.css']
})
export class DescriptionOffreComponent implements OnInit {

  @Input() offre: Offre;
  route : String;

  constructor(private location: Location) { }

  ngOnInit() {
    this.route = location.origin + this.location.path();
  }

}
