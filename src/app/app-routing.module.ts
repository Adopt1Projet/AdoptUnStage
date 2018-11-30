import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';

const routes: Routes = [
  { path : 'connexion', component: PageConnexionComponent},
  { path : 'accueil', component: PageAccueilComponent},
  { path: 'postuler', component: PagePostulerComponent},
  { path: 'offres', component: PageOffresComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
