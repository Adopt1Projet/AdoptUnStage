import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  info : any;
  isInfo = false; 
  
  constructor(private token : TokenStorageService) { }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  ngOnInit() {
    this.info = {
      username: this.token.getUsername(),
    };
    if(this.info.username != "" && this.info.username != null) {this.isInfo=true;}
    else {this.isInfo=false;}
  }

}
