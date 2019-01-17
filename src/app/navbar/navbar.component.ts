import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  info: any;
  isInfo = false;
  isStagiaire = false;
  isEntreprise = false;

  constructor(private token: TokenStorageService) { }


  logout() {
    this.token.signOut();
    window.location.reload();
  }

  login() {
    setTimeout(() => {
      this.info = {
        username: this.token.getUsername(),
        authorities: this.token.getAuthorities()
      };
      if (this.info.username != "" && this.info.username != null) { this.isInfo = true; }
      else { this.isInfo = false; }

      if (this.info.authorities == "ROLE_STAGIAIRE") { this.isStagiaire = true; }
      else { this.isStagiaire = false; }

      if (this.info.authorities == "ROLE_ENTREPRISE") { this.isEntreprise = true; }
      else { this.isEntreprise = false; }
    }, 100)
  }

  ngOnInit() {
    this.login();

    $(document).ready(function () {

      $(window).scroll(function () {

        var height = $('.bannerImg').height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= height - 40) {
          $('.navbar').addClass('solid-nav');
        } else {
          $('.navbar').removeClass('solid-nav');
        }

      });
    });

    $( '.menu li a' ).on("click", function(){
      $('.navbar-toggler').click();
    });
  }

  ngDoCheck() {
    this.login();
  }

}
