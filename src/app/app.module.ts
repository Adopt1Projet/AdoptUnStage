import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthGuardStagiaire } from './auth/auth.guardstagiaire';
import { AuthGuardEntreprise } from './auth/auth.guardentreprise';
import { AuthGuardAdmin } from './auth/auth.guardadmin'
import { SimpleModalModule } from 'ngx-simple-modal';
import { UiSwitchModule } from 'ngx-toggle-switch';

// Elements fixes sur pages et accueil site: Accueil, Navbar, Footer, boutons accueil et connexion
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
import { BoutonInscriptionAccueilComponent } from './Router/PageAccueil/bouton-inscription-accueil/bouton-inscription-accueil.component';
import { BesoinAideComponent } from './Router/PageAccueil/besoin-aide/besoin-aide.component';
// tslint:disable-next-line:max-line-length

// Page Inscription Stagiaire
import { PageBoardEntrepriseComponent } from './Router/PageBoardEntreprise/page-board-entreprise/page-board-entreprise.component';
import { FormulaireCreerOffreComponent } from './Router/PageBoardEntreprise/formulaire-creer-offre/formulaire-creer-offre.component';
import { ConfirmComponent } from './Router/PageBoardEntreprise/confirm/confirm.component';
import { GestionDesOffresComponent } from './Router/PageBoardEntreprise/gestion-des-offres/gestion-des-offres.component';
import { InfosEntrepriseComponent } from './Router/PageBoardEntreprise/infos-entreprise/infos-entreprise.component';
import { OffreDetailsComponent } from './Router/PageBoardEntreprise/offre-details/offre-details.component';
import { ModifierOffreComponent } from './Router/PageBoardEntreprise/modifier-offre/modifier-offre.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
// tslint:disable-next-line:max-line-length
import { FormulaireInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/formulaire-inscription-stagiaire/formulaire-inscription-stagiaire.component';
// tslint:disable-next-line:max-line-length

// Page Inscription entreprise
// tslint:disable-next-line:max-line-length
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
// tslint:disable-next-line:max-line-length
import { FormulaireIncriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/formulaire-incription-entreprise/formulaire-incription-entreprise.component';

//Page Offres de stages
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { ListeOffresComponent } from './Router/PageOffres//liste-offres/liste-offres.component';
import { ItemOffreComponent } from './Router/PageOffres//item-offre/item-offre.component';

// Page Postuler
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';

// Page connexion
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { FormulaireConnexionComponent } from './Router/PageConnexion/formulaire-connexion/formulaire-connexion.component';

// Board stagiaire
import { PageBoardStagiaireComponent } from './Router/BoardStagiaire/page-board-stagiaire/page-board-stagiaire.component';
import { InfosStagiaireComponent } from './Router/BoardStagiaire/infos-stagiaire/infos-stagiaire.component';
import { GestionCandidaturesComponent } from './Router/BoardStagiaire/gestion-candidatures/gestion-candidatures.component';

import { ClickOutsideModule } from 'ng-click-outside';
// Board entreprise
// tslint:disable-next-line:max-line-length
import { BoutonsInscriptionConnexionComponent } from './Router/PageConnexion/boutons-inscription-connexion/boutons-inscription-connexion.component';
import { FormulairePostulerComponent } from './Router/PagePostuler/formulaire-postuler/formulaire-postuler.component';
import { ItemEntrepriseComponent } from './Router/PagePartenaires/item-entreprise/item-entreprise.component';
import { ListeEntreprisesComponent } from './Router/PagePartenaires/liste-entreprises/liste-entreprises.component';

// Page partenaires
import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { ActeursComponent } from './Router/PagePartenaires/acteurs/acteurs.component';
import { RemerciementsComponent } from './Router/PagePartenaires/remerciements/remerciements.component';
import { ParticipantsComponent } from './Router/PagePartenaires/participants/participants.component';

// Page détail offres
import { PageDetailOffreComponent } from './Router/PageOffres/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { BoutonsOffreComponent } from './Router/PageOffres/PageDetailOffre/boutons-offre/boutons-offre.component';
import { DescriptionEntrepriseComponent } from './Router/PageOffres/PageDetailOffre/description-entreprise/description-entreprise.component';
import { DescriptionOffreComponent } from './Router/PageOffres/PageDetailOffre/description-offre/description-offre.component';
import { InfosStageComponent } from './Router/PageOffres/PageDetailOffre/infos-stage/infos-stage.component';
import { PageFaqComponent } from './Router/PageFAQ/page-faq/page-faq.component';
import { ListeFaqComponent } from './Router/PageFAQ/liste-faq/liste-faq.component';
import { ItemFaqComponent } from './Router/PageFAQ/item-faq/item-faq.component';
import { PageQuiSommesNousComponent } from './Router/PageQuiSommesNous/page-qui-sommes-nous/page-qui-sommes-nous.component';
import { PresentationNousComponent } from './Router/PageQuiSommesNous/presentation-nous/presentation-nous.component';
import { LiensInscriptionsComponent } from './Router/PageQuiSommesNous/liens-inscriptions/liens-inscriptions.component';
import { VideoPresentationComponent } from './Router/PageQuiSommesNous/video-presentation/video-presentation.component';
import { FormulaireContactComponent } from './Router/PageContactezNous/formulaire-contact/formulaire-contact.component';
import { PageContactezNousComponent } from './Router/PageContactezNous/page-contactez-nous/page-contactez-nous.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';

// Page actualités
import { PageActusComponent } from './Router/PageActus/page-actus/page-actus.component';
import { ListeActusComponent } from './Router/PageActus/liste-actus/liste-actus.component';
import { ItemActusComponent } from './Router/PageActus/item-actus/item-actus.component';
import { ActuDetailComponent } from './Router/PageActus/actu-detail/actu-detail.component';
import { QuiSommesNousComponent } from './Router/PageAccueil/qui-sommes-nous/qui-sommes-nous.component';
import { PageBoiteAOutilsComponent } from './Router/PageBoiteAOutils/page-boite-a-outils/page-boite-a-outils.component';
import { AlertComponent } from './alert/alert.component';
import { PageErrorComponent } from './Router/PageError/page-error/page-error.component';
import { PageNonConnecteComponent } from './Router/PageNonConnecte/page-non-connecte/page-non-connecte.component';
import { OffreItemComponent } from './Router/PageBoardEntreprise/offre-item/offre-item.component';
import { ActusAccueilComponent } from './Router/PageAccueil/actus-accueil/actus-accueil.component';
import { OffresAccueilComponent } from './Router/PageAccueil/offres-accueil/offres-accueil.component';
import { ConditionUtilisationComponent } from './Router/ModalConditionUtilisation/condition-utilisation/condition-utilisation.component';
import { ListePostulantsComponent } from './Router/PageBoardEntreprise/liste-postulants/liste-postulants.component';
import { PageDetailNonConnecteComponent } from './Router/PageNonConnecte/page-detail-non-connecte/page-detail-non-connecte.component';
import { PageAdminComponent } from './Router/PageAdmin/page-admin/page-admin.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { SidenavAdminComponent } from './Router/PageAdmin/sidenav-admin/sidenav-admin.component';
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
import { PageAccueilFaqAdminComponent } from "./Router/PageAdmin/PageFaqAdmin/page-faq-admin/page-accueil-faq-admin";
import { CreerFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/creer-faq-admin/creer-faq-admin.component';
import { PagePartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/page-partenaires-admin/page-partenaires-admin.component';
import { ModifierFaqAdminComponent } from './Router/PageAdmin/PageFaqAdmin/modifier-faq-admin/modifier-faq-admin.component';
import { PageStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/page-stagiaire-admin/page-stagiaire-admin.component';
import { ModifierStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/modifier-stagiaire-admin/modifier-stagiaire-admin.component';
import { CreerStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/creer-stagiaire-admin/creer-stagiaire-admin.component';
import { PageAideComponent } from './Router/PageAide/page-aide/page-aide.component';
import { ListeAideComponent } from './Router/PageAide/liste-aide/liste-aide.component';
import { ItemAideComponent } from './Router/PageAide/item-aide/item-aide.component';
import { PageAccueilStagiairesAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/page-stagiaire-admin/page-accueil-stagiaires-admin';
import { PageOffresAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-offres-admin/page-offres-admin.component';
import { ModifierOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/modifier-offre-admin/modifier-offre-admin.component';
import { PageAccueilOffresAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-offres-admin/page-accueil-offres-admin';
import { PostulantsOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/postulants-offre-admin/postulants-offre-admin.component';
import { PageModifierOffreAdminComponent } from './Router/PageAdmin/PageOffresAdmin/page-modifier-offre-admin/page-modifier-offre-admin.component';
import { CandidaturesStagiaireAdminComponent } from './Router/PageAdmin/PageStagiairesAdmin/candidatures-stagiaire-admin/candidatures-stagiaire-admin.component';
import { OffresEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/offres-entreprise-admin/offres-entreprise-admin.component';
import { CreerEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/creer-entreprise-admin/creer-entreprise-admin.component';
import { ModifierEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/modifier-entreprise-admin/modifier-entreprise-admin.component';
import { PageEntrepriseAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/page-entreprise-admin/page-entreprise-admin.component';
import { PageAccueilEntreprisesAdminComponent } from './Router/PageAdmin/PageEntreprisesAdmin/page-entreprise-admin/page-accueil-entreprises-admin';
import { PageAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/page-aide-admin/page-aide-admin.component';
import { ListeAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/liste-aide-admin/liste-aide-admin.component';
import { CreerAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/creer-aide-admin/creer-aide-admin.component';
import { ModifierAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/modifier-aide-admin/modifier-aide-admin.component';

import { PageAccueilPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/page-partenaires-admin/page-accueil-partenaires-admin';
import { CreerActeurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-acteur-admin/creer-acteur-admin.component';
import { CreerCreateurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-createur-admin/creer-createur-admin.component';
import { ActeursPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/acteurs-partenaires-admin/acteurs-partenaires-admin.component';
import { EntreprisesPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-partenaires-admin/entreprises-partenaires-admin.component';
import { CreateursPartenairesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/createurs-partenaires-admin/createurs-partenaires-admin.component';
import { CreerPartenaireEntrepriseAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/creer-partenaire-entreprise-admin/creer-partenaire-entreprise-admin.component';
import { BtnActeursAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/acteurs-partenaires-admin/btn-acteurs-admin';
import { BtnCreateursAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/createurs-partenaires-admin/btn-createurs-admin';
import { EntreprisesActiveAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-active-admin/entreprises-active-admin.component';
import { BtnEntreprisesAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/entreprises-partenaires-admin/btn-entreprises-admin';
import { PageAccueilAideAdminComponent } from './Router/PageAdmin/PageAideAdmin/page-aide-admin/page-accueil-aide-admin';
import { ActuDashboardComponent } from './Router/PageAdmin/PageDashboardAdmin/actu-dashboard/actu-dashboard.component';
import { OffresDashboardComponent } from './Router/PageAdmin/PageDashboardAdmin/offres-dashboard/offres-dashboard.component';
import { StagiairesDashboardComponent } from './Router/PageAdmin/PageDashboardAdmin/stagiaires-dashboard/stagiaires-dashboard.component';
import { EntreprisesDashboardComponent } from './Router/PageAdmin/PageDashboardAdmin/entreprises-dashboard/entreprises-dashboard.component';
import { ModifierActeurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-acteur-admin/modifier-acteur-admin.component';
import { ModifierCreateurAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-createur-admin/modifier-createur-admin.component';
import { ModifierPartenaireEntrepriseAdminComponent } from './Router/PageAdmin/PagePartenairesAdmin/modifier-partenaire-entreprise-admin/modifier-partenaire-entreprise-admin.component';
import { CreerCollegeAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/creer-college-admin/creer-college-admin.component';
import { ModifierCollegeAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/modifier-college-admin/modifier-college-admin.component';
import { PageCollegesAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/page-colleges-admin/page-colleges-admin.component';
import { PageAccueilCollegesAdminComponent } from './Router/PageAdmin/PageCollegesAdmin/page-colleges-admin/page-accueil-colleges-admin';
import { ConfirmDeleteUserComponent } from './Router/ConfirmsModals/confirm-delete-user/confirm-delete-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageAccueilComponent,
    PageBoardEntrepriseComponent,
    FormulaireCreerOffreComponent,
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
    PageBoardStagiaireComponent,
    InfosStagiaireComponent,
    GestionCandidaturesComponent,
    PageBoardEntrepriseComponent,
    FormulaireCreerOffreComponent,
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
    PageAideComponent,
    PageActusComponent,
    ListeActusComponent,
    ItemActusComponent,
    ActuDetailComponent,
    QuiSommesNousComponent,
    PageBoiteAOutilsComponent,
    AlertComponent,
    OffreDetailsComponent,
    PageErrorComponent,
    ModifierOffreComponent,
    OffreItemComponent,
    PageNonConnecteComponent,
    ConfirmComponent,
    BesoinAideComponent,
    ActusAccueilComponent,
    OffresAccueilComponent,
    ConditionUtilisationComponent,
    ListePostulantsComponent,
    PageDetailNonConnecteComponent,
    PageAdminComponent,
    SidenavAdminComponent,
    DashboardAdminComponent,
    ActuAdminComponent,
    FaqAdminComponent,
    OffresAdminComponent,
    StagiairesAdminComponent,
    EntreprisesAdminComponent,
    CollegesAdminComponent,
    CreateActuAdminComponent,
    PageActuAdminComponent,
    PageAccueilActuAdminComponent,
    ModifierActuAdminComponent,
    PageFaqAdminComponent,
    PageAccueilFaqAdminComponent,
    CreerFaqAdminComponent,
    PagePartenairesAdminComponent,
    ModifierFaqAdminComponent,
    PageStagiaireAdminComponent,
    ModifierStagiaireAdminComponent,
    CreerStagiaireAdminComponent,
    ListeAideComponent,
    ItemAideComponent,
    PageAccueilStagiairesAdminComponent,
    PageOffresAdminComponent,
    ModifierOffreAdminComponent,
    PageAccueilOffresAdminComponent,
    PostulantsOffreAdminComponent,
    PageModifierOffreAdminComponent,
    CandidaturesStagiaireAdminComponent,
    OffresEntrepriseAdminComponent,
    CreerEntrepriseAdminComponent,
    ModifierEntrepriseAdminComponent,
    PageEntrepriseAdminComponent,
    PageAccueilEntreprisesAdminComponent,
    PageAideAdminComponent,
    ListeAideAdminComponent,
    CreerAideAdminComponent,
    ModifierAideAdminComponent,
    PageAccueilPartenairesAdminComponent,
    CreerActeurAdminComponent,
    CreerCreateurAdminComponent,
    ActeursPartenairesAdminComponent,
    EntreprisesPartenairesAdminComponent,
    CreateursPartenairesAdminComponent,
    CreerPartenaireEntrepriseAdminComponent,
    BtnActeursAdminComponent,
    BtnCreateursAdminComponent,
    EntreprisesActiveAdminComponent,
    BtnEntreprisesAdminComponent,
    PageAccueilAideAdminComponent,
    ActuDashboardComponent,
    OffresDashboardComponent,
    StagiairesDashboardComponent,
    EntreprisesDashboardComponent,
    ModifierActeurAdminComponent,
    ModifierCreateurAdminComponent,
    ModifierPartenaireEntrepriseAdminComponent,
    CreerCollegeAdminComponent,
    ModifierCollegeAdminComponent,
    PageCollegesAdminComponent,
    PageAccueilCollegesAdminComponent,
    ConfirmDeleteUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SimpleModalModule.forRoot({ container: "modal-container" }),
    UiSwitchModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    ClickOutsideModule,
  ],

  exports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
  ],

  entryComponents: [
    ConfirmComponent,
    ConfirmDeleteUserComponent,
    ConditionUtilisationComponent
  ],

  providers: [httpInterceptorProviders, AuthGuard, AuthGuardEntreprise, AuthGuardStagiaire, AuthGuardAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }


