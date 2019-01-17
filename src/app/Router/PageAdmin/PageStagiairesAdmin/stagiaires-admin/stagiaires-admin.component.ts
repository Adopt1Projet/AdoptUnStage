import { Component, OnInit } from '@angular/core';
import { Stagiaire } from 'src/app/modeles/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-stagiaires-admin',
  templateUrl: './stagiaires-admin.component.html',
  styleUrls: ['./stagiaires-admin.component.css']
})
export class StagiairesAdminComponent implements OnInit {

  stagiaires: Stagiaire[];
  page: number;
  taillePage: number;

  constructor(private stagiaireService: StagiaireService) { }

  ngOnInit() {
    this.page = 0;
    this.taillePage = 5;
    this.stagiaireService.getStagiaireList().subscribe
      (data => { this.stagiaires = data;
                 this.stagiaires.sort((stagiaire, stagiaire2) => stagiaire2.id - stagiaire.id);
      });
  }

  increasePage() {
    this.page++;
  }

  decreasePage() {
    this.page--;
  }

  getPage() {
    const debut = this.page*this.taillePage;
    const fin = Number(this.taillePage) + Number(this.page*this.taillePage);
    return this.stagiaires.slice(debut,fin);
  }
}