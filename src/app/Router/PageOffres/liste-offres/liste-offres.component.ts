import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {

  offres = [
    {
      titre: 'Ma première offre',
      contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      logoEntreprise: '/assets/img/wcs.png'
    },
    {
      titre: 'Ma deuxième offre',
      contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      logoEntreprise: '/assets/img/Souffle9.png'
    },
    {
      titre: 'Encore une offre',
      contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      logoEntreprise: '/assets/img/proBTP.png'
    },

    {
      titre: 'Cette offre là',
      contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      logoEntreprise: '/assets/img/beCOM.png'
    },

    {
      titre: 'Cette offre ci',
      contenu: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      logoEntreprise: '/assets/img/wcs.png'

      
    }
  ];

  page = 1;

  constructor() { }

  ngOnInit() {
  }

}
