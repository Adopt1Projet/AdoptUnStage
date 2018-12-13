import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Partenaire } from 'src/app/partenaire';
import { PartenaireService } from 'src/app/partenaire.service';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.css']
})
export class ListeEntreprisesComponent implements OnInit {

  partenaires: Observable<Partenaire[]>;

  constructor(private partenaireService : PartenaireService) { }

  ngOnInit() {
    this.partenaires = this.partenaireService.getPartenairesList();
  }
}
