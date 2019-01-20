import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-actu-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilActu">
  Vous êtes sur le pannel des Actualités.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer des actualités</li>
    <li>Voir la liste des actualités</li>
    <li>Modifier les actualités</li>
    <li>Supprimer les actualités</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-actu-admin.component.css']
})
export class PageAccueilActuAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
