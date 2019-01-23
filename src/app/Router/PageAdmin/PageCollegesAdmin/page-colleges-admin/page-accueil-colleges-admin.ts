import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-colleges-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilColleges">
  Vous êtes sur le pannel des collèges.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Ajouter de nouveaux collèges</li>
    <li>Voir la liste des collèges</li>
    <li>Modifier les informations des collèges</li>
    <li>Supprimer les collèges</li>
  </ul>
  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-colleges-admin.component.css']
})
export class PageAccueilCollegesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}