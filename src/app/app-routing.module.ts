import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';

const routes: Routes = [
  { path : 'connexion', component: PageConnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
