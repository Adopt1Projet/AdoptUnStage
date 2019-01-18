import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-offres-admin',
  template: `
  
<div class="container col-10 bodyAccueilOffres">
  Vous êtes sur le pannel de gestion des offres enregistrées.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Voir la liste de tout les offres enregistrées</li>
    <li>Modifier des offres</li>
    <li>Supprimer des offres</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-offres-admin.component.css']
})
export class PageAccueilOffresAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
