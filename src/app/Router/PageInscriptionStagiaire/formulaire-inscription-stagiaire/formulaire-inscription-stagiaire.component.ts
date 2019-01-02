import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { Stagiaire } from 'src/app/modeles/stagiaire';

@Component({
  selector: 'app-formulaire-inscription-stagiaire',
  templateUrl: './formulaire-inscription-stagiaire.component.html',
  styleUrls: ['./formulaire-inscription-stagiaire.component.css']
})
export class FormulaireInscriptionStagiaireComponent implements OnInit {

  formCreate = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),

    prenom: new FormControl(null, [Validators.required]),
    etablissement: new FormControl(null, [Validators.required]),
    ville: new FormControl(null),
    codePostal: new FormControl(0, [Validators.required]),
    tel: new FormControl(0) // Créer une fonction qui supprime les espaces entre les nombres.

    });

  constructor(private stagiaireService: StagiaireService, private _location: Location) { }

  ngOnInit() {
  }

  retourPage() {
    this._location.back();
  }
   onSubmit() {
    const stagiaire: Stagiaire = this.formCreate.value;
    stagiaire.username = stagiaire.email;
    this.stagiaireService.createStagiaire(stagiaire)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }
}
