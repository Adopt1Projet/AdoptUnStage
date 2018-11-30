import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';

const routes: Routes = [
  { path: 'boardentreprise', component: PageBoardEntrepriseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
