import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-createurs-admin',
  template: `
  
  <div class="container col-12 col-md-10 bodyBtnCreateurs d-flex justify-content-around">
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/createurs/listecreateurs" routerLinkActive="router-link-active">Liste
    Créateurs</button>
  <button type="button" class="btn col-3 col-sm-3" routerLink="/admin/partenaires/createurs/creercreateur" routerLinkActive="router-link-active">Créer
    Créateur</button>
</div>

<router-outlet></router-outlet>
  `,
  styleUrls: ['./createurs-partenaires-admin.component.css']
})
export class BtnCreateursAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
