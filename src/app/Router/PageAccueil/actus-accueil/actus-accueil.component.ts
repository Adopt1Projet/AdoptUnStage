import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Actu } from 'src/app/modeles/actu';
import { ActuService } from 'src/app/services/actu.service';

@Component({
  selector: 'app-actus-accueil',
  templateUrl: './actus-accueil.component.html',
  styleUrls: ['./actus-accueil.component.css']
})
export class ActusAccueilComponent implements OnInit {

  actus: any;

  constructor(private actuService: ActuService) { }

  ngOnInit() {
    this.actuService.getActusList()
      .subscribe(data => this.actus = data);
  };

}
