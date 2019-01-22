import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-partenaires-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilPartenaires">
  Vous êtes sur le pannel des partenaires.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer des partenaires</li>
    <li>Voir la liste des partenaires</li>
    <li>Modifier des partenaires</li>
    <li>Supprimer des partenaires</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-partenaires-admin.component.css']
})
export class PageAccueilPartenairesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
