import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-gestion-candidatures',
  templateUrl: './gestion-candidatures.component.html',
  styleUrls: ['./gestion-candidatures.component.css']
})
export class GestionCandidaturesComponent implements OnInit {

  offres: Offre[];
  offresPourvues: Offre[];
  username: string;

  constructor(private token: TokenStorageService,
    private offreService: OffreService) { }

  @ViewChild('content') content: ElementRef;

  public downloadPDF() {
    console.log(this.offres);
    
    var docDefinition = {
      content: [
        {
          text: 'Ma liste de candidatures sur AdoptUnStage.fr',
          fontSize: 20,
          bold: true,
          alignment: 'center'
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto',],

            body: [
              ['titre', 'Description', 'Secteur', 'Rue', 'Ville', 'Code postal']
            ]
          }
        }
      ]
    };


    this.offres.forEach((offre) => {
      let temp: any[] = [offre.titre + " " + offre.entreprise.raisonSociale, offre.description, offre.entreprise.secteur, offre.rue, offre.ville, offre.codePostal];
      docDefinition.content[0].text;
      docDefinition.content[1].table.body.push(temp);
    });

    pdfMake.createPdf(docDefinition).download();
  }

  ngOnInit() {
    this.username = this.token.getUsername();

    this.offreService.getOffresListStagiaire(this.username)
      .subscribe(data => {
        this.offres = data;
        this.offres.sort((offre, offre2) => offre2.id - offre.id);
        for (let i = 0; i < this.offres.length; i++) {
          this.offres[i].dateDebut = moment(this.offres[i].dateDebut).format("DD/MM/YYYY");
          this.offres[i].dateFin = moment(this.offres[i].dateFin).format("DD/MM/YYYY");
        }
      })

    this.offreService.getOffresListStagiairePourvues(this.username)
      .subscribe(data => {
        this.offresPourvues = data;
        this.offresPourvues.sort((offre, offre2) => offre2.id - offre.id);
        for (let i = 0; i < this.offresPourvues.length; i++) {
          this.offresPourvues[i].dateDebut = moment(this.offresPourvues[i].dateDebut).format("DD/MM/YYYY");
          this.offresPourvues[i].dateFin = moment(this.offresPourvues[i].dateFin).format("DD/MM/YYYY");
        }
      })

  }

}
