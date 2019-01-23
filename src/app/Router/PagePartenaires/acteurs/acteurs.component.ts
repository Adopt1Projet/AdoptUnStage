import { Component, OnInit } from '@angular/core';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { Partenaire } from 'src/app/modeles/partenaire';

@Component({
  selector: 'app-acteurs',
  templateUrl: './acteurs.component.html',
  styleUrls: ['./acteurs.component.css']
})
export class ActeursComponent implements OnInit {

  public acteurs : any;

  constructor(private partenaireService : PartenaireService) { }

  ngOnInit() {
    this.acteurs = this.partenaireService.getAllActors()
      .subscribe(data => {this.acteurs = data;
                          console.log(this.acteurs)});
  }

}
