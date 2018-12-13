import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
// tslint:disable-next-line:max-line-length
import { PageInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/page-inscription-stagiaire/page-inscription-stagiaire.component';
// tslint:disable-next-line:max-line-length
import { FormulaireInscriptionStagiaireComponent } from './Router/PageInscriptionStagiaire/formulaire-inscription-stagiaire/formulaire-inscription-stagiaire.component';
import { PageInscriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/page-inscription-entreprise/page-inscription-entreprise.component';
import { FormulaireIncriptionEntrepriseComponent } from './Router/PageInscriptionEntreprise/formulaire-incription-entreprise/formulaire-incription-entreprise.component';
import { PageOffresComponent } from './Router/PageOffres/page-offres/page-offres.component';
import { ListeOffresComponent } from './Router/PageOffres//liste-offres/liste-offres.component';
import { ItemOffreComponent } from './Router/PageOffres//item-offre/item-offre.component';
import { BoutonInscriptionAccueilComponent } from './Router/PageAccueil/bouton-inscription-accueil/bouton-inscription-accueil.component';
import { PagePostulerComponent } from './Router/PagePostuler/page-postuler/page-postuler.component';
import { PageConnexionComponent } from './Router/PageConnexion/page-connexion/page-connexion.component';
import { BoutonsInscriptionConnexionComponent } from './Router/PageConnexion/boutons-inscription-connexion/boutons-inscription-connexion.component';
import { FormulaireConnexionComponent } from './Router/PageConnexion/formulaire-connexion/formulaire-connexion.component';
import { FormulairePostulerComponent } from './Router/PagePostuler/formulaire-postuler/formulaire-postuler.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoutonsOffreComponent } from './Router/PageDetailOffre/boutons-offre/boutons-offre.component';
import { DescriptionEntrepriseComponent } from './Router/PageDetailOffre/description-entreprise/description-entreprise.component';
import { DescriptionOffreComponent } from './Router/PageDetailOffre/description-offre/description-offre.component';
import { InfosStageComponent } from './Router/PageDetailOffre/infos-stage/infos-stage.component';
import { PageDetailOffreComponent } from './Router/PageDetailOffre/page-detail-offre/page-detail-offre.component';


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
