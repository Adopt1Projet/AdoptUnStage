import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-offre',
  templateUrl: './item-offre.component.html',
  styleUrls: ['./item-offre.component.css']
})
export class ItemOffreComponent implements OnInit {

  @Input() offreTitre: string;
  @Input() offreContenu: string;
  @Input() logoEntreprise: string;

  lastUpdate = new Date()
  
  constructor() { }

  ngOnInit() {
  }

}
