import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-entreprise',
  templateUrl: './item-entreprise.component.html',
  styleUrls: ['./item-entreprise.component.css']
})
export class ItemEntrepriseComponent implements OnInit {

  @Input() partenaire: any;

  constructor() { }

  ngOnInit() {
  }

}
