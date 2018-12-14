import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { PageDetailOffreComponent } from './Router/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { PageBoardStagiaireComponent } from './Router/BoardStagiaire/page-board-stagiaire/page-board-stagiaire.component';
import { GestionCandidaturesComponent } from './Router/BoardStagiaire/gestion-candidatures/gestion-candidatures.component';
import { InfosStagiaireComponent } from './Router/BoardStagiaire/infos-stagiaire/infos-stagiaire.component';

const routes: Routes = [
  { path : 'connexion', component: PageConnexionComponent},
  { path : 'accueil', component: PageAccueilComponent},
  { path: 'postuler', component: PagePostulerComponent},
  { path: 'inscriptionstagiaire', component: PageInscriptionStagiaireComponent},
  { path: 'offres', component: PageOffresComponent },
  { path: 'partenaires', component: PagePartenairesComponent},
  { path: 'detailoffre', component: PageDetailOffreComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent},
  { path: 'boardstagiaire', component: PageBoardStagiaireComponent, children: [
    { path: 'gestionstagiaire' , component: GestionCandidaturesComponent },
    { path: 'infosstagiaire' , component: InfosStagiaireComponent },
    { path: '', redirectTo: '/boardstagiaire/gestionstagiaire', pathMatch: 'full'},
  ]},
  { path: '', redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
