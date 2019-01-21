import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.css']
})
export class ListeEntreprisesComponent implements OnInit {

  entreprises: Observable<Entreprise[]>;

  constructor(private entrepriseService : EntrepriseService) { }

  ngOnInit() {
    this.entrepriseService.getEntreprisesActives()
      .subscribe(data => { this.entreprises = data;
                           console.log(this.entreprises)})
  }
}