import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../auth/token-storage.service';
@Component({
  selector: 'app-liens-inscriptions',
  templateUrl: './liens-inscriptions.component.html',
  styleUrls: ['./liens-inscriptions.component.css']
})
export class LiensInscriptionsComponent implements OnInit {
  isInfo = false;
  isEntreprise = false;
  isStagiaire = false;
  info : any;

  constructor(private token : TokenStorageService) { }

  ngOnInit() {

    this.info = {
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
      
    };

    if(this.info.username != "" && this.info.username != null) {this.isInfo=true;}
    else {this.isInfo=false;}

    if(this.info.authorities == "ROLE_STAGIAIRE") {this.isStagiaire=true;}
    else {this.isStagiaire=false;}
    
    if(this.info.authorities == "ROLE_ENTREPRISE") {this.isEntreprise=true;}
    else {this.isEntreprise=false;}
  }


}
