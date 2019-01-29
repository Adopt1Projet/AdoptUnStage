import { Component, OnInit } from '@angular/core';
import { PartenaireService } from 'src/app/services/partenaire.service';
import { Observable } from 'rxjs';
import { Partenaire } from 'src/app/modeles/partenaire';

@Component({
  selector: 'app-remerciements',
  templateUrl: './remerciements.component.html',
  styleUrls: ['./remerciements.component.css']
})
export class RemerciementsComponent implements OnInit {

  public createurs : Observable<Partenaire>;

  constructor(private partenaireService : PartenaireService) { }

  ngOnInit() {
    this.partenaireService.getAllCreators()
      .subscribe(data => this.createurs = data);
  }

}
