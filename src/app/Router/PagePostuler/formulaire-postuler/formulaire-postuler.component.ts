import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OffreService } from 'src/app/services/offre.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-formulaire-postuler',
  templateUrl: './formulaire-postuler.component.html',
  styleUrls: ['./formulaire-postuler.component.css']
})
export class FormulairePostulerComponent implements OnInit {

  id_offre : number;
  username : String;
  postuler: boolean = false;

  formPostuler = new FormGroup({
    motivation: new FormControl(),
  });

  constructor(private token: TokenStorageService, 
              private offreService: OffreService,
              private alertService: AlertService, 
              private route: ActivatedRoute,
              private _location: Location) { }

  onSubmit() {
    console.log(this.formPostuler.value);
    this.offreService.postuler(this.id_offre, this.username, this.formPostuler.value)
      .subscribe(data => {console.log(data); 
                 this.postuler = true;
                 this.alertService.success('Merci d\'avoir postulé à l\'offre ! Pense à surveiller régulièrement ta boite mail pour la réponse !', true)
                }, error => console.log(error));
  }

  retourPage() {
    this._location.back();
  }

  ngOnInit() {
    this.id_offre = this.route.snapshot.params['id'];
    this.username = this.token.getUsername();
  }

}
