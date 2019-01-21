import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-entreprises-admin',
  template: `
  
  <div class="container col-12 col-md-10 bodyBtnEntreprises d-flex justify-content-around">
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/entreprises/listeentreprises" routerLinkActive="router-link-active">Liste
    Entreprises Créées</button>
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/entreprises/creerentreprise" routerLinkActive="router-link-active">Créer
    Entreprise</button>
    <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/entreprises/listeentreprisesparticipantes" routerLinkActive="router-link-active">Liste Entreprises Actives</button>
</div>

<router-outlet></router-outlet>
  `,
  styleUrls: ['./entreprises-partenaires-admin.component.css']
})
export class BtnEntreprisesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
