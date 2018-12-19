import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { Entreprise } from 'src/app/modeles/entreprise';

@Component({
  selector: 'app-formulaire-incription-entreprise',
  templateUrl: './formulaire-incription-entreprise.component.html',
  styleUrls: ['./formulaire-incription-entreprise.component.css']
})
export class FormulaireIncriptionEntrepriseComponent implements OnInit {

  formCreate = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),

    raisonSociale: new FormControl(null, [Validators.required]),
    secteur: new FormControl(null, [Validators.required]),

    statutEntreprise: new FormControl(null, [Validators.required]),
    adresse: new FormControl(null, [Validators.required]),
   
    ville: new FormControl(null),
    codePostal: new FormControl(0, [Validators.required]),
    
    
    logo: new FormControl(null),
    prenom: new FormControl(null, [Validators.required]),
    
    fonction: new FormControl(null),
    tel: new FormControl(0), 

    siteWeb: new FormControl(null), 
    
    });

  constructor(private entrepriseService: EntrepriseService, private _location: Location) { }

  retourPage() {
    this._location.back();
  }

  ngOnInit() {
  }
 
  onSubmit(){
    const entreprise: Entreprise = this.formCreate.value;
    entreprise.username = entreprise.email;
    this.entrepriseService.createEntreprise(entreprise)
    .subscribe(data => console.log(data), error => console.log(error));
    this.formCreate.reset();
  }

}
