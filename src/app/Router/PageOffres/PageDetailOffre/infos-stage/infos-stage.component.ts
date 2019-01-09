import { Component, OnInit, Input } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
@Component({
  selector: 'app-infos-stage',
  templateUrl: './infos-stage.component.html',
  styleUrls: ['./infos-stage.component.css']
})
export class InfosStageComponent implements OnInit {

  @Input() offre: Offre;

  constructor() { }

  ngOnInit() {
  }

}
