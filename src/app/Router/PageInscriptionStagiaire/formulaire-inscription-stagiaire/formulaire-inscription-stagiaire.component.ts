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
    });

  constructor(private stagiaireService: StagiaireService, private _location: Location) { }

  ngOnInit() {
  }

  retourPage() {
    this._location.back();
  }
  
  onSubmit(){
    const user: Stagiaire = Object.assign({}, this.formCreate.value);
    this.stagiaireService.createStagiaire(user)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }
  
}
