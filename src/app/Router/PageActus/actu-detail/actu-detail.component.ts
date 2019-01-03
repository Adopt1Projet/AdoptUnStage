import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actu-detail',
  templateUrl: './actu-detail.component.html',
  styleUrls: ['./actu-detail.component.css']
})
export class ActuDetailComponent implements OnInit {
  
  @Input() actu: any;

  constructor() { }

  ngOnInit() {
  }

}
