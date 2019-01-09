import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffreService } from 'src/app/services/offre.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-detail-offre',
  templateUrl: './page-detail-offre.component.html',
  styleUrls: ['./page-detail-offre.component.css']
})
export class PageDetailOffreComponent implements OnInit {

  offre: any;

  constructor(private offreService: OffreService, private route: ActivatedRoute) { }




  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.offreService.getOffre(id).subscribe(data => { this.offre = data; console.log(this.offre) });

  }

}
