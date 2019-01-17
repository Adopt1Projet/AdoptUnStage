import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-faq-admin',
  template: `
  
<div class="container col-10 bodyAccueilFaq">
  Vous êtes sur le pannel des F.A.Q.
  Sur ce dernier, vous aurez la possibilité de :
  <ul>
    <li>Créer des questions - réponses</li>
    <li>Voir la liste des F.A.Q</li>
    <li>Modifier les F.A.Q</li>
    <li>Supprimer les F.A.Q</li>
  </ul>

  <p>Attention, toute modification ou suppression de contenu est IRREVERSIBLE.</p>
  </div>
  `,
  styleUrls: ['./page-faq-admin.component.css']
})
export class PageAccueilFaqAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
