import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageAccueilComponent } from './Router/PageAccueil/page-accueil/page-accueil.component';
import { PageInscriptionEntrepriseComponent } from './Router/PageAccueil/page-inscription-entreprise/page-inscription-entreprise/page-inscription-entreprise.component';
import { FormulaireIncriptionEntrepriseComponent } from './Router/PageAccueil/page-inscription-entreprise/formulaire-incription-entreprise/formulaire-incription-entreprise.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageAccueilComponent,
    PageInscriptionEntrepriseComponent,
    FormulaireIncriptionEntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
