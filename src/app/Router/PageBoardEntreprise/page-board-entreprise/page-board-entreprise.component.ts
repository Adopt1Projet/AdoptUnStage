import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'app-page-board-entreprise',
  templateUrl: './page-board-entreprise.component.html',
  styleUrls: ['./page-board-entreprise.component.css']
})
export class PageBoardEntrepriseComponent implements OnInit {
  info : any;
  constructor() { }

  ngOnInit() {
  }

}
