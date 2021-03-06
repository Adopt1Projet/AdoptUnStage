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

// PAGES BOARD ADMIN :

import { PageAdminComponent } from './Router/PageAdmin/page-admin/page-admin.component';
import { AuthGuardAdmin } from './auth/auth.guardadmin';
import { DashboardAdminComponent } from './Router/PageAdmin/PageDashboardAdmin/dashboard-admin/dashboard-admin.component';
import { ActuAdminComponent } from './Router/PageAdmin/PageActuAdmin/actu-admin/actu-admin.component';
import { FaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/faq-admin/faq-admin.component';
import { OffresAdminComponent } from './Router/PageAdmin/PageOffresAdmin/offres-admin/offres-admin.component';
import { StagiairesAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/stagiaires-admin/stagiaires-admin.component';
import { EntreprisesAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/entreprises-admin/entreprises-admin.component';
import { CollegesAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/colleges-admin/colleges-admin.component';
import { CreateActuAdminComponent } from './Router/PageAdmin/PageActuAdmin/create-actu-admin/create-actu-admin.component';
import { PageActuAdminComponent } from './Router/PageAdmin/PageActuAdmin/page-actu-admin/page-actu-admin.component';
import { PageAccueilActuAdminComponent } from './Router/PageAdmin/PageActuAdmin/page-actu-admin/page-accueil-actu-admin.component';
import { ModifierActuAdminComponent } from './Router/PageAdmin/PageActuAdmin/modifier-actu-admin/modifier-actu-admin.component';
import { PageFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/page-faq-admin/page-faq-admin.component';
import { PageAccueilFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/page-faq-admin/page-accueil-faq-admin';
import { CreerFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/creer-faq-admin/creer-faq-admin.component';
import { ModifierFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/modifier-faq-admin/modifier-faq-admin.component';
import { PageAccueilStagiairesAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/page-stagiaire-admin/page-accueil-stagiaires-admin';
import { PageStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/page-stagiaire-admin/page-stagiaire-admin.component';
import { CreerStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/creer-stagiaire-admin/creer-stagiaire-admin.component';
import { PageOffresAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-offres-admin/page-offres-admin.component';
import { PageAccueilOffresAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-offres-admin/page-accueil-offres-admin';
import { PostulantsOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/postulants-offre-admin/postulants-offre-admin.component';
import { ModifierOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/modifier-offre-admin/modifier-offre-admin.component';
import { PageModifierOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-modifier-offre-admin/page-modifier-offre-admin.component';
import { ModifierStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/modifier-stagiaire-admin/modifier-stagiaire-admin.component';
import { CandidaturesStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/candidatures-stagiaire-admin/candidatures-stagiaire-admin.component';
import { PageAccueilEntreprisesAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/page-entreprise-admin/page-accueil-entreprises-admin';
import { PageEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/page-entreprise-admin/page-entreprise-admin.component';
import { ModifierEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/modifier-entreprise-admin/modifier-entreprise-admin.component';
import { CreerEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/creer-entreprise-admin/creer-entreprise-admin.component';
import { OffresEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/offres-entreprise-admin/offres-entreprise-admin.component';
import { PageAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/page-aide-admin/page-aide-admin.component';
import { ListeAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/liste-aide-admin/liste-aide-admin.component';
import { ModifierAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/modifier-aide-admin/modifier-aide-admin.component';
import { CreerAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/creer-aide-admin/creer-aide-admin.component';
import { PageAccueilPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/page-partenaires-admin/page-accueil-partenaires-admin';
import { PagePartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/page-partenaires-admin/page-partenaires-admin.component';
import { ActeursPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/acteurs-partenaires-admin/acteurs-partenaires-admin.component';
import { CreateursPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/createurs-partenaires-admin/createurs-partenaires-admin.component';
import { EntreprisesPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-partenaires-admin/entreprises-partenaires-admin.component';
import { CreerCreateurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-createur-admin/creer-createur-admin.component';
import { CreerActeurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-acteur-admin/creer-acteur-admin.component';
import { CreerPartenaireEntrepriseAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-partenaire-entreprise-admin/creer-partenaire-entreprise-admin.component';
import { BtnActeursAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/acteurs-partenaires-admin/btn-acteurs-admin';
import { BtnCreateursAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/createurs-partenaires-admin/btn-createurs-admin';
import { EntreprisesActiveAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-active-admin/entreprises-active-admin.component';
import { BtnEntreprisesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-partenaires-admin/btn-entreprises-admin';
import { PageAccueilAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/page-aide-admin/page-accueil-aide-admin';
import { ModifierActeurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-acteur-admin/modifier-acteur-admin.component';
import { ModifierCreateurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-createur-admin/modifier-createur-admin.component';
import { ModifierPartenaireEntrepriseAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-partenaire-entreprise-admin/modifier-partenaire-entreprise-admin.component';
import { PageCollegesAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/page-colleges-admin/page-colleges-admin.component';
import { PageAccueilCollegesAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/page-colleges-admin/page-accueil-colleges-admin';
import { CreerCollegeAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/creer-college-admin/creer-college-admin.component';
import { ModifierCollegeAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/modifier-college-admin/modifier-college-admin.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'accueil', component: PageAccueilComponent },
  {
    path: 'postuler/:id',
    canActivate: [AuthGuardStagiaire],
    component: PagePostulerComponent
  },
  {
    path: 'inscriptionstagiaire',
    component: PageInscriptionStagiaireComponent
  },
  { path: 'offres', component: PageOffresComponent },
  {
    path: 'inscriptionentreprise',
    component: PageInscriptionEntrepriseComponent
  },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  {
    path: 'admin',
    canActivate: [AuthGuardAdmin],
    component: PageAdminComponent,
    children: [
      { path: 'dashboard', component: DashboardAdminComponent },
      {
        path: 'actus',
        component: PageActuAdminComponent,
        children: [
          { path: 'listeactus', component: ActuAdminComponent },
          { path: 'creeractu', component: CreateActuAdminComponent },
          { path: 'accueilactu', component: PageAccueilActuAdminComponent },
          { path: 'modifieractu/:id', component: ModifierActuAdminComponent },
          {
            path: '',
            redirectTo: '/admin/actus/accueilactu',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'aide',
        component: PageAideAdminComponent,
        children: [
          { path: 'accueilaide', component: PageAccueilAideAdminComponent },
          { path: 'listeaide', component: ListeAideAdminComponent },
          { path: 'creeraide', component: CreerAideAdminComponent },
          { path: 'modifieraide/:id', component: ModifierAideAdminComponent },
          { path: '', redirectTo: '/admin/aide/accueilaide', pathMatch: 'full' }
        ]
      },
      {
        path: 'faq',
        component: PageFaqAdminComponent,
        children: [
          { path: 'accueilfaq', component: PageAccueilFaqAdminComponent },
          { path: 'listefaq', component: FaqAdminComponent },
          { path: 'creerfaq', component: CreerFaqAdminComponent },
          { path: 'modifierfaq/:id', component: ModifierFaqAdminComponent },
          { path: '', redirectTo: '/admin/faq/accueilfaq', pathMatch: 'full' }
        ]
      },
      {
        path: 'partenaires',
        component: PagePartenairesAdminComponent,
        children: [
          {
            path: 'accueilpartenaires',
            component: PageAccueilPartenairesAdminComponent
          },
          {
            path: 'acteurs',
            component: BtnActeursAdminComponent,
            children: [
              {
                path: 'listeacteurs',
                component: ActeursPartenairesAdminComponent
              },
              { path: 'creeracteur', component: CreerActeurAdminComponent },
              {
                path: 'modifieracteur/:id',
                component: ModifierActeurAdminComponent
              }
            ]
          },
          {
            path: 'createurs',
            component: BtnCreateursAdminComponent,
            children: [
              {
                path: 'listecreateurs',
                component: CreateursPartenairesAdminComponent
              },
              { path: 'creercreateur', component: CreerCreateurAdminComponent },
              {
                path: 'modifiercreateur/:id',
                component: ModifierCreateurAdminComponent
              }
            ]
          },
          {
            path: 'entreprises',
            component: BtnEntreprisesAdminComponent,
            children: [
              {
                path: 'listeentreprises',
                component: EntreprisesPartenairesAdminComponent
              },
              {
                path: 'listeentreprisesparticipantes',
                component: EntreprisesActiveAdminComponent
              },
              {
                path: 'creerentreprise',
                component: CreerPartenaireEntrepriseAdminComponent
              },
              {
                path: 'modifierentreprise/:id',
                component: ModifierPartenaireEntrepriseAdminComponent
              }
            ]
          },
          {
            path: '',
            redirectTo: '/admin/partenaires/accueilpartenaires',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'offres',
        component: PageOffresAdminComponent,
        children: [
          { path: 'accueiloffres', component: PageAccueilOffresAdminComponent },
          { path: 'listeoffres', component: OffresAdminComponent },
          {
            path: 'postulantsoffre/:id',
            component: PostulantsOffreAdminComponent
          },
          {
            path: 'modifieroffre/:id',
            component: PageModifierOffreAdminComponent
          },
          {
            path: '',
            redirectTo: '/admin/offres/accueiloffres',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'stagiaires',
        component: PageStagiaireAdminComponent,
        children: [
          {
            path: 'accueilstagiaires',
            component: PageAccueilStagiairesAdminComponent
          },
          { path: 'listestagiaires', component: StagiairesAdminComponent },
          {
            path: 'modifierstagiaire/:id',
            component: ModifierStagiaireAdminComponent
          },
          { path: 'creerstagiaire', component: CreerStagiaireAdminComponent },
          {
            path: 'candidaturesstagiaire/:username',
            component: CandidaturesStagiaireAdminComponent
          },
          {
            path: '',
            redirectTo: '/admin/stagiaires/accueilstagiaires',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'entreprises',
        component: PageEntrepriseAdminComponent,
        children: [
          {
            path: 'accueilentreprises',
            component: PageAccueilEntreprisesAdminComponent
          },
          { path: 'listeentreprises', component: EntreprisesAdminComponent },
          {
            path: 'modifierentreprise/:username',
            component: ModifierEntrepriseAdminComponent
          },
          { path: 'creerentreprise', component: CreerEntrepriseAdminComponent },
          {
            path: 'offresentreprise/:username',
            component: OffresEntrepriseAdminComponent
          },
          {
            path: '',
            redirectTo: '/admin/entreprises/accueilentreprises',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'colleges',
        component: PageCollegesAdminComponent,
        children: [
          {
            path: 'accueilcolleges',
            component: PageAccueilCollegesAdminComponent
          },
          { path: 'listecolleges', component: CollegesAdminComponent },
          { path: 'ajoutercollege', component: CreerCollegeAdminComponent },
          {
            path: 'modifiercollege/:id',
            component: ModifierCollegeAdminComponent
          },
          {
            path: '',
            redirectTo: '/admin/colleges/accueilcolleges',
            pathMatch: 'full'
          }
        ]
      },

      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
    ]
  },

  { path: 'partenaires', component: PagePartenairesComponent },
  {
    path: 'detailoffre/:id',
    canActivate: [AuthGuard],
    component: PageDetailOffreComponent
  },
  { path: 'quisommesnous', component: PageQuiSommesNousComponent },
  {
    path: 'boardstagiaire',
    canActivate: [AuthGuardStagiaire],
    component: PageBoardStagiaireComponent,
    children: [
      { path: 'gestionstagiaire', component: GestionCandidaturesComponent },
      { path: 'infosstagiaire', component: InfosStagiaireComponent },
      { path: 'listeoffres', component: PageOffresComponent },
      {
        path: '',
        redirectTo: '/boardstagiaire/gestionstagiaire',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'actus', component: PageActusComponent },
  { path: 'article/:id', component: ActuDetailComponent },
  {
    path: 'boardentreprise',
    canActivate: [AuthGuardEntreprise],
    component: PageBoardEntrepriseComponent,
    children: [
      { path: 'creeroffre', component: FormulaireCreerOffreComponent },
      { path: 'gestionoffres', component: GestionDesOffresComponent },
      { path: 'infosentreprise', component: InfosEntrepriseComponent },
      {
        path: 'gestionoffres/modifieroffre/:id',
        component: ModifierOffreComponent
      },
      {
        path: 'gestionoffres/postulants/:id',
        component: ListePostulantsComponent
      },
      { path: 'offre-item', component: OffreItemComponent },
      {
        path: '',
        redirectTo: '/boardentreprise/gestionoffres',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'boiteaoutils',
    component: PageBoiteAOutilsComponent,
    children: [
      { path: 'faq', component: PageFaqComponent },
      { path: 'aide', component: PageAideComponent },
      { path: 'contact', component: PageContactezNousComponent },
      { path: '', redirectTo: '/boiteaoutils/aide', pathMatch: 'full' }
    ]
  },

  { path: 'non-connecte', component: PageNonConnecteComponent },
  { path: 'detail-non-connecte', component: PageDetailNonConnecteComponent },
  { path: 'erreur404', component: PageErrorComponent },
  { path: '**', redirectTo: 'erreur404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
