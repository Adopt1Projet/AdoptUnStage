import { Component, OnInit, Input } from '@angular/core';
import { Actu } from 'src/app/modeles/actu';
import { Observable } from 'rxjs';
import { ActuService } from 'src/app/services/actu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actu-detail',
  templateUrl: './actu-detail.component.html',
  styleUrls: ['./actu-detail.component.css']
})
export class ActuDetailComponent implements OnInit {

  actus: Observable<any>;
  article: Actu;

  constructor(private serviceActu: ActuService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.serviceActu.getActusList()
      .subscribe(data => {
        this.actus = data;
        const id = this.route.snapshot.params['id'];
        this.article = this.actus[id - 1];
      });
  }

}