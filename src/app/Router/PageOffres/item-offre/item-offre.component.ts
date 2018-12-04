import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-offre',
  templateUrl: './item-offre.component.html',
  styleUrls: ['./item-offre.component.css']
})
export class ItemOffreComponent implements OnInit {

  @Input() offreTitre: string;
  @Input() offreContenu: string;
  @Input() offreNomEntreprise: string;
  @Input() offreSecteur: string;
  @Input() offrePourvu: string;
  @Input() offreDateDebut: string;
  @Input() offreDateFin: string;
  @Input() logoEntreprise: string;

  couleur: string;

  lastUpdate = new Date()
  
  constructor() { }
  
  getCouleur(){
    if (this.offrePourvu == "Disponible") {
      return "green";
    } else {
      return "red";
    }
  }

  ngOnInit() {
    this.getCouleur();
  }

}
