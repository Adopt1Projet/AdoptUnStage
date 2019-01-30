import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-aide-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilAide">
  Vous êtes sur le pannel des Aides.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer de nouveaux éléments sur la page d'aide</li>
    <li>Voir la liste des Aides</li>
    <li>Modifier les Aides</li>
    <li>Supprimer les Aides</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-aide-admin.component.css']
})
export class PageAccueilAideAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}