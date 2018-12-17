import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';
import { FormulaireCreerOffreComponent } from './Router/PageBoardEntreprise/formulaire-creer-offre/formulaire-creer-offre.component';
import { NgbdDatepickerRange } from './Router/PageBoardEntreprise/formulaire-creer-offre/datepicker-range';
import { GestionDesOffresComponent } from './Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
// tslint:disable-next-line:max-line-length
import { FormulaireInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/formulaire-inscription-stagiaire/formulaire-inscription-stagiaire.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
// tslint:disable-next-line:max-line-length
import { FormulaireIncriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/formulaire-incription-entreprise/formulaire-incription-entreprise.component';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { ListeOffresComponent } from './Router/PageOffres//liste-offres/liste-offres.component';
import { ItemOffreComponent } from './Router/PageOffres//item-offre/item-offre.component';
import { BoutonInscriptionAccueilComponent } from './Router/PageAccueil/bouton-inscription-accueil/bouton-inscription-accueil.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
// tslint:disable-next-line:max-line-length
import { BoutonsInscriptionConnexionComponent } from './Router/PageConnexion/boutons-inscription-connexion/boutons-inscription-connexion.component';
import { FormulaireConnexionComponent } from './Router/PageConnexion/formulaire-connexion/formulaire-connexion.component';
import { FormulairePostulerComponent } from './Router/PagePostuler/formulaire-postuler/formulaire-postuler.component';
import { ActeursComponent } from './Router/PagePartenaires/acteurs/acteurs.component';
import { RemerciementsComponent } from './Router/PagePartenaires/remerciements/remerciements.component';
import { ParticipantsComponent } from './Router/PagePartenaires/participants/participants.component';
import { ItemEntrepriseComponent } from './Router/PagePartenaires/item-entreprise/item-entreprise.component';
import { ListeEntreprisesComponent } from './Router/PagePartenaires/liste-entreprises/liste-entreprises.component';
import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { BoutonsOffreComponent } from './Router/PageDetailOffre/boutons-offre/boutons-offre.component';
import { DescriptionEntrepriseComponent } from './Router/PageDetailOffre/description-entreprise/description-entreprise.component';
import { DescriptionOffreComponent } from './Router/PageDetailOffre/description-offre/description-offre.component';
import { InfosStageComponent } from './Router/PageDetailOffre/infos-stage/infos-stage.component';
import { PageDetailOffreComponent } from './Router/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { PageFaqComponent } from './Router/PageFAQ/page-faq/page-faq.component';
import { ListeFaqComponent } from './Router/PageFAQ/liste-faq/liste-faq.component';
import { ItemFaqComponent } from './Router/PageFAQ/item-faq/item-faq.component';
import { PageQuiSommesNousComponent } from './Router/PageQuiSommesNous/page-qui-sommes-nous/page-qui-sommes-nous.component';
import { PresentationNousComponent } from './Router/PageQuiSommesNous/presentation-nous/presentation-nous.component';
import { LiensInscriptionsComponent } from './Router/PageQuiSommesNous/liens-inscriptions/liens-inscriptions.component';
import { VideoPresentationComponent } from './Router/PageQuiSommesNous/video-presentation/video-presentation.component';
import { FormulaireContactComponent } from './Router/PageContactezNous/formulaire-contact/formulaire-contact.component';
import { PageContactezNousComponent } from './Router/PageContactezNous/page-contactez-nous/page-contactez-nous.component';
import { PageAideComponent } from './Router/PageAide/page-aide/page-aide.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageAccueilComponent,
    PageBoardEntrepriseComponent,
    FormulaireCreerOffreComponent,
    NgbdDatepickerRange,
    GestionDesOffresComponent,
    InfosEntrepriseComponent,
    PageInscriptionStagiaireComponent,
    FormulaireInscriptionStagiaireComponent,
    PageInscriptionEntrepriseComponent,
    FormulaireIncriptionEntrepriseComponent,
    PageOffresComponent,
    ListeOffresComponent,
    ItemOffreComponent,
    BoutonInscriptionAccueilComponent,
    PagePostulerComponent,
    PageConnexionComponent,
    BoutonsInscriptionConnexionComponent,
    FormulaireConnexionComponent,
    FormulairePostulerComponent,
    PageBoardEntrepriseComponent,
    FormulaireCreerOffreComponent,
    NgbdDatepickerRange,
    GestionDesOffresComponent,
    InfosEntrepriseComponent,
    ActeursComponent,
    RemerciementsComponent,
    ParticipantsComponent,
    ItemEntrepriseComponent,
    ListeEntreprisesComponent,
    PagePartenairesComponent,
    BoutonsOffreComponent,
    DescriptionEntrepriseComponent,
    DescriptionOffreComponent,
    InfosStageComponent,
    PageDetailOffreComponent,
    PageFaqComponent,
    ListeFaqComponent,
    ItemFaqComponent,
    PageQuiSommesNousComponent,
    PresentationNousComponent,
    LiensInscriptionsComponent,
    VideoPresentationComponent,
    FormulaireContactComponent,
    PageContactezNousComponent,
    PageAideComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
