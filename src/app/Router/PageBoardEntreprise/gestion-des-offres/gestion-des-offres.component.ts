import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/Offre';
import { OffreService } from "src/app/offre.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent implements OnInit {

  // @Input() offre: Offre;
  offre: Observable<Offre[]>;
  id: number;
  // pourvu: boolean;
  constructor(private offreService: OffreService) {
    // this.pourvu = false;

  }

  ngOnInit() {
    this.reloadData();
  }

  deleteOffre(id) {
    this.offreService.deleteOffre(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  deleteOffres() {
    this.offreService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData() {
    this.offre = this.offreService.getOffresList();
  }
}
