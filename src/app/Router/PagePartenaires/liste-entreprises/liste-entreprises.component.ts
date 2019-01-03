import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Partenaire } from '../../../modeles/partenaire';
import { PartenaireService } from '../../../services/partenaire.service';
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.css']
})
export class ListeEntreprisesComponent implements OnInit {

  partenaires: Observable<Partenaire[]>;

  constructor(private partenaireService: PartenaireService) { }

  ngOnInit() {
    this.partenaires = this.partenaireService.getPartenairesList();
  }
}