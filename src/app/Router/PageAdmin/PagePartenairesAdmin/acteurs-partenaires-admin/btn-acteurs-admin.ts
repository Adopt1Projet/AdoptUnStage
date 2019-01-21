import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-acteurs-admin',
  template: `
  
  <div class="container col-12 col-md-10 bodyBtnActeurs d-flex justify-content-around">
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/acteurs/listeacteurs" routerLinkActive="router-link-active">Liste
    Acteurs</button>
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/acteurs/creeracteur" routerLinkActive="router-link-active">Créer
    Acteur</button>
</div>

<router-outlet></router-outlet>
  `,
  styleUrls: ['./acteurs-partenaires-admin.component.css']
})
export class BtnActeursAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
