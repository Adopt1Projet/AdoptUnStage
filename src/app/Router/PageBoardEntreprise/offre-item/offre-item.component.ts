import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { GestionDesOffresComponent } from '../gestion-des-offres/gestion-des-offres.component';

@Component({
  selector: 'app-offre-item',
  templateUrl: './offre-item.component.html',
  styleUrls: ['./offre-item.component.css']
})
export class OffreItemComponent implements OnInit {

  @Input() offres;
  offre: Offre;

  constructor(private offreService: OffreService, private list: GestionDesOffresComponent) { }



  deleteOffre() {
    this.offreService.deleteOffre(this.offre.id)
      .subscribe(
        data => {
          this.list.reloadData();
        },
        error => console.log(error));
  }
  updateOffre() {
    this.offreService.updateOffre(this.offre.id, this.offre)
      .subscribe(
        data => {
          this.list.reloadData();
        },
        error => console.log(error));
  }
  ngOnInit() { }

}
