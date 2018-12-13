import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-faq',
  templateUrl: './item-faq.component.html',
  styleUrls: ['./item-faq.component.css']
})
export class ItemFaqComponent implements OnInit {

  @Input() question : any;

  constructor() { }

  ngOnInit() {
  }

}
