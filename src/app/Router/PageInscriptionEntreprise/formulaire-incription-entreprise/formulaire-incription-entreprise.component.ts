import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-incription-entreprise',
  templateUrl: './formulaire-incription-entreprise.component.html',
  styleUrls: ['./formulaire-incription-entreprise.component.css']
})
export class FormulaireIncriptionEntrepriseComponent implements OnInit {

  formCreate = new FormGroup({
    raisonSociale: new FormControl(null, [Validators.required]),
    secteur: new FormControl(null, [Validators.required]),
    statutEntreprise: new FormControl(null, [Validators.required]),
    siteWeb: new FormControl(null),
    adresse: new FormControl(null, [Validators.required]),
    ville: new FormControl(null),
    codePostal: new FormControl(null, [Validators.required]),
    logo: new FormControl(null),
    prenom: new FormControl(null, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    fonction: new FormControl(null),
    tel: new FormControl(null),
    mail: new FormControl(null, [Validators.required]),
    mail2: new FormControl(null, [Validators.required]),
    mdp: new FormControl(null, [Validators.required]),
    mdp2: new FormControl(null, [Validators.required])
    });

  constructor(/*private userService: userService, */ private _location: Location) { }

  retourPage() {
    this._location.back();
  }

  ngOnInit() {
  }
  /*
  onSubmit(){
    const user: User = Object.assign({}, this.formCreate.value);
    this.userService.createCustomer(user)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }
  */
}
