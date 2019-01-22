import { Component, OnInit } from '@angular/core';
import { CollegeService } from '../../../services/college.service';
import { Observable } from 'rxjs';
import { College } from '../../../modeles/college';

@Component({
  selector: 'app-page-aide',
  templateUrl: './page-aide.component.html',
  styleUrls: ['./page-aide.component.css']
})
export class PageAideComponent implements OnInit {

  colleges: any;

  constructor(private collegeService: CollegeService) { }

  ngOnInit() {
    this.collegeService.getCollegesList()
          .subscribe(
            data => {
              this.colleges = data;
            
            },
            error => console.log("Une erreur est survenue.")
            );
  }
  

}
