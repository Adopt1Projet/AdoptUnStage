import { Component, OnInit, Input } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service'
import { Entreprise } from 'src/app/modeles/entreprise';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infos-entreprise',
  templateUrl: './infos-entreprise.component.html',
  styleUrls: ['./infos-entreprise.component.css']
})
export class InfosEntrepriseComponent implements OnInit {

  // @Input() entreprise: Entreprise;
  entreprise: Observable<Entreprise[]>;

  constructor(private entrepriseService: EntrepriseService) { }

  reloadData() {
    // this.entreprise = this.entrepriseService.getEntreprise();
  }
  ngOnInit() {
    this.reloadData();
  }

}
