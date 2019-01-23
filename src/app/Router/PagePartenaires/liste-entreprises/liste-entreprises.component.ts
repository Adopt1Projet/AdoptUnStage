import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { Partenaire } from 'src/app/modeles/partenaire';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.css']
})
export class ListeEntreprisesComponent implements OnInit {

  entreprises: Observable<Entreprise[]>;
  entreprisesPartenaires: Observable<Partenaire[]>;

  constructor(private entrepriseService: EntrepriseService,
    private partenaireService: PartenaireService) { }

  ngOnInit() {
    this.entrepriseService.getEntreprisesActives()
      .subscribe(data => {
      this.entreprises = data;
      })

    this.partenaireService.getAllEntreprises()
      .subscribe(data2 => {
      this.entreprisesPartenaires = data2;
      })
  }
}