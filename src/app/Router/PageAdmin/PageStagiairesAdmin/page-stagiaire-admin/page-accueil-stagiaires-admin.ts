import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-stagiaires-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilStagiaires">
  Vous êtes sur le pannel de gestion des stagiaires inscrits.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer des stagiaires</li>
    <li>Voir la liste de tout les stagiaires inscrits</li>
    <li>Modifier des stagiaires</li>
    <li>Supprimer des stagiaires</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-stagiaire-admin.component.css']
})
export class PageAccueilStagiairesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
