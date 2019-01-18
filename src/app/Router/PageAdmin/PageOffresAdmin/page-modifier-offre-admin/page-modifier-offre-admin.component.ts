import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/services/offre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-modifier-offre-admin',
  templateUrl: './page-modifier-offre-admin.component.html',
  styleUrls: ['./page-modifier-offre-admin.component.css']
})
export class PageModifierOffreAdminComponent implements OnInit {
  offre: any;

  constructor(
    private offreService: OffreService,
    private route: ActivatedRoute) { }

  reloadData() {
    const id = this.route.snapshot.params['id'];
    this.offreService.getOffre(id)
      .subscribe(data => { this.offre = data });
  }

  ngOnInit() {
    this.reloadData()
  }

}
