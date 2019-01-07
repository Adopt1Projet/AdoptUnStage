import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../../services/entreprise.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-infos-entreprise',
  templateUrl: './infos-entreprise.component.html',
  styleUrls: ['./infos-entreprise.component.css']
})
export class InfosEntrepriseComponent implements OnInit {


  username;
  entreprise: any;


  constructor(private entrepriseService: EntrepriseService, private token: TokenStorageService) { }


  ngOnInit() {
    this.username = this.token.getUsername();
    this.entrepriseService.getEntreprise(this.username).subscribe(data => { this.entreprise = data; console.log(this.entreprise); }, error => console.log(error));;
  }

}
