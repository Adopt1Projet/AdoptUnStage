import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { StagiaireService } from 'src/app/stagiaire.service';
// import { Stagiaire } from 'src/app/stagiaire';


@Component({
  selector: 'app-infos-stagiaire',
  templateUrl: './infos-stagiaire.component.html',
  styleUrls: ['./infos-stagiaire.component.css']
})
export class InfosStagiaireComponent implements OnInit {

  /* formUpdate = new FormGroup({
    prenom: new FormControl(null, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    etablissement: new FormControl(null, [Validators.required]),
    ville: new FormControl(null),
    codePostal: new FormControl(null, [Validators.required]),
    tel: new FormControl(null), // Créer une fonction qui supprime les espaces entre les nombres.
    mail: new FormControl(null, [Validators.required]),
    mail2: new FormControl(null, [Validators.required]),
    mdp: new FormControl(null, [Validators.required]),
    mdp2: new FormControl(null, [Validators.required])
    }); */

  constructor() { }

  ngOnInit() {
  }

}
