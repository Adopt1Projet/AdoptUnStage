import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActuService } from 'src/app/services/actu.service';
import { Actu } from 'src/app/modeles/actu';

@Component({
  selector: 'app-liste-actus',
  templateUrl: './liste-actus.component.html',
  styleUrls: ['./liste-actus.component.css']
})
export class ListeActusComponent implements OnInit {

  actus: Observable<Actu[]>;

  constructor(private actuService: ActuService) {
  }

  ngOnInit() {
    this.actus = this.actuService.getActusList();
  }
}
