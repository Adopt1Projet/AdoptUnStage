import { Component, OnInit, Input } from '@angular/core';
import { Actu } from 'src/app/modeles/actu';
import { Observable } from 'rxjs';
import { ActuService } from 'src/app/services/actu.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actu-detail',
  templateUrl: './actu-detail.component.html',
  styleUrls: ['./actu-detail.component.css']
})
export class ActuDetailComponent implements OnInit {

  actus: any;
  article: Actu;

  constructor(
    private serviceActu: ActuService, 
    private route: ActivatedRoute,
    private location: Location) { }

  retourPage() {
    this.location.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.serviceActu.getActu(id)
      .subscribe(data => {
        this.actus = data;
        // this.article = this.actus[id - 1];
      });
  }

}