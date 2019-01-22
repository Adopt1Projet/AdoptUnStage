import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aide } from 'src/app/modeles/aide';
import { AideService } from 'src/app/services/aide.service';

@Component({
  selector: 'app-liste-aide',
  templateUrl: './liste-aide.component.html',
  styleUrls: ['./liste-aide.component.css']
})
export class ListeAideComponent implements OnInit {

  aides: Observable<Aide[]>
  
  constructor(private aideService: AideService) { }

  ngOnInit() {
    this.aides = this.aideService.getAidesList();
  }

}
