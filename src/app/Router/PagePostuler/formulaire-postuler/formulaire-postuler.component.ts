import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OffreService } from 'src/app/services/offre.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-formulaire-postuler',
  templateUrl: './formulaire-postuler.component.html',
  styleUrls: ['./formulaire-postuler.component.css']
})
export class FormulairePostulerComponent implements OnInit {

  id_offre : number;
  username : String;

  formPostuler = new FormGroup({
    motivation: new FormControl(),
  });

  constructor(private token: TokenStorageService, private offreService: OffreService, private route: ActivatedRoute) { }

  onSubmit() {
    this.offreService.postuler(this.id_offre, this.username, this.formPostuler.value)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  ngOnInit() {
    this.id_offre = this.route.snapshot.params['id'];
    this.username = this.token.getUsername();
  }

}
