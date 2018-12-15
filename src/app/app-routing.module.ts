import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';
import { FormulaireCreerOffreComponent } from './Router/PageBoardEntreprise/formulaire-creer-offre/formulaire-creer-offre.component';
import { GestionDesOffresComponent } from './Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'postuler', component: PagePostulerComponent },
  { path: 'inscriptionstagiaire', component: PageInscriptionStagiaireComponent },
  { path: 'offres', component: PageOffresComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {
    path: 'boardentreprise', component: PageBoardEntrepriseComponent, children: [
      { path: 'creeroffre', component: FormulaireCreerOffreComponent },
      { path: 'gestionoffres', component: GestionDesOffresComponent },
      { path: 'infosentreprise', component: InfosEntrepriseComponent },
      // { path: '', redirectTo: '/gestionoffres', pathMatch: 'full' },
    ]
  }]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
