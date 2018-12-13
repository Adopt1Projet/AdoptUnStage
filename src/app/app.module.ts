import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Elements fixes sur pages et accueil site: Accueil, Navbar, Footer, boutons accueil et connexion
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
import { BoutonInscriptionAccueilComponent } from './Router/PageAccueil/bouton-inscription-accueil/bouton-inscription-accueil.component';
// tslint:disable-next-line:max-line-length
import { BoutonsInscriptionConnexionComponent } from './Router/PageConnexion/boutons-inscription-connexion/boutons-inscription-connexion.component';

// Page Inscription Stagiaire
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
import { FormulairePostulerComponent } from './Router/PagePostuler/formulaire-postuler/formulaire-postuler.component';

// Page connexion
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { FormulaireConnexionComponent } from './Router/PageConnexion/formulaire-connexion/formulaire-connexion.component';

// Board stagiaire
import { PageBoardStagiaireComponent } from './Router/BoardStagiaire/page-board-stagiaire/page-board-stagiaire.component';
import { InfosStagiaireComponent } from './Router/BoardStagiaire/infos-stagiaire/infos-stagiaire.component';
import { GestionCandidaturesComponent } from './Router/BoardStagiaire/gestion-candidatures/gestion-candidatures.component';

// Board entreprise
import { ItemEntrepriseComponent } from './Router/PagePartenaires/item-entreprise/item-entreprise.component';
import { ListeEntreprisesComponent } from './Router/PagePartenaires/liste-entreprises/liste-entreprises.component';

// Page partenaires
import { PagePartenairesComponent } from './Router/PagePartenaires/page-partenaires/page-partenaires.component';
import { ActeursComponent } from './Router/PagePartenaires/acteurs/acteurs.component';
import { RemerciementsComponent } from './Router/PagePartenaires/remerciements/remerciements.component';
import { ParticipantsComponent } from './Router/PagePartenaires/participants/participants.component';

// Page détail offres
import { PageDetailOffreComponent } from './Router/PageDetailOffre/page-detail-offre/page-detail-offre.component';
import { BoutonsOffreComponent } from './Router/PageDetailOffre/boutons-offre/boutons-offre.component';
import { DescriptionEntrepriseComponent } from './Router/PageDetailOffre/description-entreprise/description-entreprise.component';
import { DescriptionOffreComponent } from './Router/PageDetailOffre/description-offre/description-offre.component';
import { InfosStageComponent } from './Router/PageDetailOffre/infos-stage/infos-stage.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageAccueilComponent,
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
    PageDetailOffreComponent
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
