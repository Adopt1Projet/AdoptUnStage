import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-entreprises-admin',
  template: `
  
<div class="container col-12 col-md-10 bodyAccueilEntreprises">
  Vous êtes sur le pannel de gestion des entreprises inscrites.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer des entreprises</li>
    <li>Voir la liste de toute les entreprises inscrites</li>
    <li>Modifier des entreprises</li>
    <li>Supprimer des entreprises</li>
    <li>Voir les offres liées aux entreprises</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-entreprise-admin.component.css']
})
export class PageAccueilEntreprisesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
