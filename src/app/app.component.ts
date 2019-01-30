import { Component } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdoptUnStage';
  mediaWidth = window.matchMedia("(min-width: 992px)");

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) { }

  onActivate(event: any) {
    if (this.mediaWidth.matches) {
      if (isPlatformBrowser(this.platformId)) {
        let scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);
      }
    }
  }
}
