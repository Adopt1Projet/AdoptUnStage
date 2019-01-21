import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-liste-postulants',
  templateUrl: './liste-postulants.component.html',
  styleUrls: ['./liste-postulants.component.css']
})
export class ListePostulantsComponent implements OnInit {

  postulants: any;
  offre: any;

  constructor(private offreService: OffreService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.offreService.getPostulants(id).subscribe
      (data => this.postulants = data);
    this.offreService.getOffre(id).subscribe
      (data => this.offre = data);
  }

  retourPage() {
    this.location.back();
  }

}
