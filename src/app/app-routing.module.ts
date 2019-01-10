import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthGuardStagiaire } from './auth/auth.guardstagiaire';
import { AuthGuardEntreprise } from './auth/auth.guardentreprise';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';
import { FormulaireCreerOffreComponent } from './Router/PageBoardEntreprise/formulaire-creer-offre/formulaire-creer-offre.component';
import { GestionDesOffresComponent } from './Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';

import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { PageDetailOffreComponent } from './Router/PageOffres/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { PageBoardStagiaireComponent } from './Router/BoardStagiaire/page-board-stagiaire/page-board-stagiaire.component';
import { GestionCandidaturesComponent } from './Router/BoardStagiaire/gestion-candidatures/gestion-candidatures.component';
import { InfosStagiaireComponent } from './Router/BoardStagiaire/infos-stagiaire/infos-stagiaire.component';
import { PageFaqComponent } from './Router/PageFAQ/page-faq/page-faq.component';
import { PageQuiSommesNousComponent } from './Router/PageQuiSommesNous/page-qui-sommes-nous/page-qui-sommes-nous.component';
import { PageContactezNousComponent } from './Router/PageContactezNous/page-contactez-nous/page-contactez-nous.component';
import { PageAideComponent } from './Router/PageAide/page-aide/page-aide.component';
import { PageActusComponent } from './Router/PageActus/page-actus/page-actus.component';
import { ActuDetailComponent } from './Router/PageActus/actu-detail/actu-detail.component';
import { PageBoiteAOutilsComponent } from './Router/PageBoiteAOutils/page-boite-a-outils/page-boite-a-outils.component';
import { PageErrorComponent } from './Router/PageError/page-error/page-error.component';
import { PageNonConnecteComponent } from './Router/PageNonConnecte/page-non-connecte/page-non-connecte.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';
import { ModifierOffreComponent } from './Router/PageBoardEntreprise/modifier-offre/modifier-offre.component';
import { OffreItemComponent } from './Router/PageBoardEntreprise/offre-item/offre-item.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'postuler/:id', canActivate: [AuthGuardStagiaire], component: PagePostulerComponent },
  { path: 'inscriptionstagiaire', component: PageInscriptionStagiaireComponent },
  { path: 'offres', component: PageOffresComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'partenaires', component: PagePartenairesComponent },
  { path: 'detailoffre/:id', component: PageDetailOffreComponent },
  { path: 'postuler/:id', component: PagePostulerComponent },
  { path: 'quisommesnous', component: PageQuiSommesNousComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent },
  {
    path: 'boardstagiaire', canActivate: [AuthGuardStagiaire], component: PageBoardStagiaireComponent, children: [
      { path: 'gestionstagiaire', canActivate: [AuthGuardStagiaire], component: GestionCandidaturesComponent },
      { path: 'infosstagiaire', canActivate: [AuthGuardStagiaire], component: InfosStagiaireComponent },
      { path: '', redirectTo: '/boardstagiaire/gestionstagiaire', pathMatch: 'full' },
    ]
  },
  { path: 'contact', component: PageContactezNousComponent },
  { path: 'actus', component: PageActusComponent },
  { path: 'article/:id', component: ActuDetailComponent },
  {
    path: 'boardentreprise', canActivate: [AuthGuardEntreprise], component: PageBoardEntrepriseComponent, children: [
      { path: 'creeroffre', canActivate: [AuthGuardEntreprise], component: FormulaireCreerOffreComponent },
      { path: 'gestionoffres', canActivate: [AuthGuardEntreprise], component: GestionDesOffresComponent },
      { path: 'infosentreprise', canActivate: [AuthGuardEntreprise], component: InfosEntrepriseComponent },
      { path: 'modifieroffre', component: ModifierOffreComponent },
      { path: 'offre-item', component: OffreItemComponent },
      { path: '', redirectTo: '/boardentreprise/creeroffre', pathMatch: 'full' },
    ]
  },
  {
    path: 'boiteaoutils', component: PageBoiteAOutilsComponent, children: [
      { path: 'faq', component: PageFaqComponent },
      { path: 'aide', component: PageAideComponent },
      { path: '', redirectTo: '/boiteaoutils/aide', pathMatch: 'full' },
    ]
  },

  { path: 'non-connecte', component: PageNonConnecteComponent },
  { path: 'erreur404', component: PageErrorComponent },
  { path: '**', redirectTo: 'erreur404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
