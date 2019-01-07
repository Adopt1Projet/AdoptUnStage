import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {

  offres = [
    {
      titre: "Stage d'observation",
      nomEntreprise: "MONOPRIX",
      isPourvu: false,
      pourvu: "",
      secteur: "Commerce,distribution",
      dateDebut: "Du 03 déc. 2018",
      dateFin: "Au 07 déc. 2018",
      logoEntreprise: '/assets/img/wcs.png'
    },
    {
      titre: "Stage découverte de l'immobilier",
      nomEntreprise: "LYON 9 IMMO",
      isPourvu: true,
      pourvu: "",
      secteur: "Immobilier",
      dateDebut: "Du 03 déc. 2018",
      dateFin: "Au 07 déc. 2018",
      logoEntreprise: '/assets/img/Souffle9.png'
    },
    {
      titre: "Découverte des métiers techniques",
      nomEntreprise: "ENGIE",
      isPourvu: false,
      pourvu: "",
      secteur: "Maintenance, entretien",
      dateDebut: "Du 03 déc. 2018",
      dateFin: "Au 07 déc. 2018",
      logoEntreprise: '/assets/img/proBTP.png'
    },

    {
      titre: "Découverte des archives",
      nomEntreprise: "BIBLIOTHEQUE MUNICIPALE",
      isPourvu: false,
      pourvu: "",
      secteur: "Art, culture",
      dateDebut: "Du 03 déc. 2018",
      dateFin: "Au 07 déc. 2018",
      logoEntreprise: '/assets/img/beCOM.png'
    },

    {
      titre: "Stage de découverte métier",
      nomEntreprise: "LE CAESAR PALACE",
      isPourvu: true,
      pourvu: "",
      secteur: "Spectacle, divertissement",
      dateDebut: "Du 03 déc. 2018",
      dateFin: "Au 07 déc. 2018",
      logoEntreprise: '/assets/img/wcs.png'


    }
  ];

  page = 1;

  constructor() { }


  ngOnInit() {
    for (let i = 0; i < this.offres.length; i++) {
      if (this.offres[i].isPourvu) {
        this.offres[i].pourvu = "Disponible";
      } else {
        this.offres[i].pourvu = "Pourvue"
      }
    }
  }

}
