import { Component, OnInit } from '@angular/core';
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-remerciements',
  templateUrl: './remerciements.component.html',
  styleUrls: ['./remerciements.component.css']
})
export class RemerciementsComponent implements OnInit {

  public createurs : any;

  constructor(private partenaireService : PartenaireService) { }

  ngOnInit() {
    this.createurs = this.partenaireService.getAllCreators()
      .subscribe(data => {this.createurs = data;
                          console.log(this.createurs)});
  }

}
