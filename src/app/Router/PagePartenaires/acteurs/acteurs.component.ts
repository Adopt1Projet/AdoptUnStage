import { Component, OnInit } from '@angular/core';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { Partenaire } from 'src/app/modeles/partenaire';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acteurs',
  templateUrl: './acteurs.component.html',
  styleUrls: ['./acteurs.component.css']
})
export class ActeursComponent implements OnInit {

  public acteurs : Observable<Partenaire>;

  constructor(private partenaireService : PartenaireService) { }

  ngOnInit() {
    this.partenaireService.getAllActors()
      .subscribe(data => this.acteurs = data);
  }

}
