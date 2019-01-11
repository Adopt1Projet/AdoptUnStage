import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-page-board-stagiaire',
  templateUrl: './page-board-stagiaire.component.html',
  styleUrls: ['./page-board-stagiaire.component.css']
})
export class PageBoardStagiaireComponent implements OnInit {

  username: string;
  stagiaire: Object;

  constructor(private token: TokenStorageService,
    private stagiaireService: StagiaireService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.stagiaireService.getStagiaire(this.username)
      .subscribe(data => {
        this.stagiaire = data;
      })
  }

}
