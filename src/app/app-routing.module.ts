import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';

const routes: Routes = [
  { path : 'accueil', component: PageAccueilComponent },
  { path: 'offres', component: PageOffresComponent },
  { path : '', redirectTo: 'accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
