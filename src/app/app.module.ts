import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageAccueilComponent,
    PageOffresComponent,
    ListeOffresComponent,
    ItemOffreComponent,
    BoutonInscriptionAccueilComponent,
    PagePostulerComponent,
    PageConnexionComponent,
    BoutonsInscriptionConnexionComponent,
    FormulaireConnexionComponent,
    FormulairePostulerComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
