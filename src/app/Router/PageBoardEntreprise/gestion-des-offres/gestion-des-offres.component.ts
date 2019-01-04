import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from "src/app/services/offre.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gestion-des-offres',
  templateUrl: './gestion-des-offres.component.html',
  styleUrls: ['./gestion-des-offres.component.css']
})
export class GestionDesOffresComponent implements OnInit {

  offres: Observable<Offre[]>;

  constructor(private offreService: OffreService) { }

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
    this.offres = this.offreService.getOffresList();
  }
  ngOnInit() {
    this.reloadData();
  }
}
