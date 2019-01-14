import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-page-board-entreprise',
  templateUrl: './page-board-entreprise.component.html',
  styleUrls: ['./page-board-entreprise.component.css']
})
export class PageBoardEntrepriseComponent implements OnInit {

  username: string;
  entreprise: Object;

  constructor(private token: TokenStorageService,
    private entrepriseService: EntrepriseService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.entrepriseService.getEntreprise(this.username)
      .subscribe(data => {
        this.entreprise = data;
      })
  }

}
