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
import { PageDetailNonConnecteComponent } from './Router/PageNonConnecte/page-detail-non-connecte/page-detail-non-connecte.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';
import { ModifierOffreComponent } from './Router/PageBoardEntreprise/modifier-offre/modifier-offre.component';
import { OffreItemComponent } from './Router/PageBoardEntreprise/offre-item/offre-item.component';
import { ListePostulantsComponent } from './Router/PageBoardEntreprise/liste-postulants/liste-postulants.component';
import { PageAdminComponent } from './Router/PageAdmin/page-admin/page-admin.component';
import { AuthGuardAdmin } from './auth/auth.guardadmin';
import { DashboardAdminComponent } from './Router/PageAdmin/dashboard-admin/dashboard-admin.component';
import { ActuAdminComponent } from './Router/PageAdmin/actu-admin/actu-admin.component';
import { FaqAdminComponent } from './Router/PageAdmin/faq-admin/faq-admin.component';
import { PartenairesAdminComponent } from './Router/PageAdmin/partenaires-admin/partenaires-admin.component';
import { OffresAdminComponent } from './Router/PageAdmin/offres-admin/offres-admin.component';
import { StagiairesAdminComponent } from './Router/PageAdmin/stagiaires-admin/stagiaires-admin.component';
import { EntreprisesAdminComponent } from './Router/PageAdmin/entreprises-admin/entreprises-admin.component';
import { CollegesAdminComponent } from './Router/PageAdmin/colleges-admin/colleges-admin.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'postuler/:id', canActivate: [AuthGuardStagiaire], component: PagePostulerComponent },
  { path: 'inscriptionstagiaire', component: PageInscriptionStagiaireComponent },
  { path: 'offres', component: PageOffresComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'admin', canActivate: [AuthGuardAdmin], component: PageAdminComponent, children: [
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'actus', component: ActuAdminComponent},
    { path: 'faq', component: FaqAdminComponent},
    { path: 'partenaires', component: PartenairesAdminComponent},
    { path: 'offres', component: OffresAdminComponent},
    { path: 'stagiaires', component: StagiairesAdminComponent},
    { path: 'entreprises', component: EntreprisesAdminComponent},
    { path: 'colleges', component: CollegesAdminComponent},
    
    
    { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  ]},

  { path: 'partenaires', component: PagePartenairesComponent },
  { path: 'detailoffre/:id', canActivate: [AuthGuard], component: PageDetailOffreComponent },
  { path: 'quisommesnous', component: PageQuiSommesNousComponent },
  {
    path: 'boardstagiaire', canActivate: [AuthGuardStagiaire], component: PageBoardStagiaireComponent, children: [
      { path: 'gestionstagiaire', component: GestionCandidaturesComponent },
      { path: 'infosstagiaire', component: InfosStagiaireComponent },
      { path: '', redirectTo: '/boardstagiaire/gestionstagiaire', pathMatch: 'full' },
    ]
  },
  { path: 'contact', component: PageContactezNousComponent },
  { path: 'actus', component: PageActusComponent },
  { path: 'article/:id', component: ActuDetailComponent },
  {
    path: 'boardentreprise', canActivate: [AuthGuardEntreprise], component: PageBoardEntrepriseComponent, children: [
      { path: 'creeroffre', component: FormulaireCreerOffreComponent },
      { path: 'gestionoffres', component: GestionDesOffresComponent },
      { path: 'infosentreprise', component: InfosEntrepriseComponent },
      { path: 'modifieroffre/:id', component: ModifierOffreComponent },
      { path: 'postulants/:id', component: ListePostulantsComponent },
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
  { path: 'detail-non-connecte', component: PageDetailNonConnecteComponent},
  { path: 'erreur404', component: PageErrorComponent },
  { path: '**', redirectTo: 'erreur404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
