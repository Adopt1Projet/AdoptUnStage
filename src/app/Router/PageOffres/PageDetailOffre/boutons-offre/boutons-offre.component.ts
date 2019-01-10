import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boutons-offre',
  templateUrl: './boutons-offre.component.html',
  styleUrls: ['./boutons-offre.component.css']
})
export class BoutonsOffreComponent implements OnInit {

  @Input() offre: Offre;

  constructor(private _location: Location) { }

  retourPage() {
    this._location.back();
  }

  ngOnInit() {
  }

}
