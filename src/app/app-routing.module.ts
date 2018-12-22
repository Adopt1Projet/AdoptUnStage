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
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';
import { FormulaireCreerOffreComponent } from './Router/PageBoardEntreprise/formulaire-creer-offre/formulaire-creer-offre.component';
import { GestionDesOffresComponent } from './Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';
import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { PageDetailOffreComponent } from './Router/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { PageBoardStagiaireComponent } from './Router/BoardStagiaire/page-board-stagiaire/page-board-stagiaire.component';
import { GestionCandidaturesComponent } from './Router/BoardStagiaire/gestion-candidatures/gestion-candidatures.component';
import { InfosStagiaireComponent } from './Router/BoardStagiaire/infos-stagiaire/infos-stagiaire.component';
import { PageFaqComponent } from './Router/PageFAQ/page-faq/page-faq.component';
import { PageQuiSommesNousComponent } from './Router/PageQuiSommesNous/page-qui-sommes-nous/page-qui-sommes-nous.component';
import { PageContactezNousComponent } from './Router/PageContactezNous/page-contactez-nous/page-contactez-nous.component';
import { PageAideComponent } from './Router/PageAide/page-aide/page-aide.component';
import { PageActusComponent } from './Router/PageActus/page-actus/page-actus.component';
import { ActuDetailComponent } from './Router/PageActus/actu-detail/actu-detail.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'postuler', component: PagePostulerComponent },
  { path: 'inscriptionstagiaire', component: PageInscriptionStagiaireComponent },
  { path: 'offres', component: PageOffresComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'boardentreprise', component: PageBoardEntrepriseComponent },
  { path: 'creerOffre', component: FormulaireCreerOffreComponent },
  { path: 'gestionOffres', component: GestionDesOffresComponent },
  { path: 'infosEntreprise', component: InfosEntrepriseComponent },
  { path: 'partenaires', component: PagePartenairesComponent},
  { path: 'faq', component: PageFaqComponent},
  { path: 'aide', component: PageAideComponent },
  { path: 'detailoffre', component: PageDetailOffreComponent },
  { path: 'quisommesnous', component: PageQuiSommesNousComponent},
  { path: 'boardentreprise', component: PageBoardEntrepriseComponent },
  { path: 'inscriptionentreprise', component: PageInscriptionEntrepriseComponent},
  { path: 'boardstagiaire', component: PageBoardStagiaireComponent, children: [
    { path: 'gestionstagiaire' , component: GestionCandidaturesComponent },
    { path: 'infosstagiaire' , component: InfosStagiaireComponent },
    { path: '', redirectTo: '/boardstagiaire/gestionstagiaire', pathMatch: 'full'},
  ]},
  { path: 'contact', component: PageContactezNousComponent},
  { path: 'actus', component: PageActusComponent},
  { path: 'article/:id', component: ActuDetailComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
