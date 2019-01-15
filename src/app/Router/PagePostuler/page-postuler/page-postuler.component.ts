import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-page-postuler',
  templateUrl: './page-postuler.component.html',
  styleUrls: ['./page-postuler.component.css']
})
export class PagePostulerComponent implements OnInit {

  offre: any;

  constructor(private offreService: OffreService, private route : ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.offreService.getOffre(id).subscribe
      (data => { this.offre = data });
  }

}
