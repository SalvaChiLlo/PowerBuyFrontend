import { Component, OnInit, AfterViewInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private renderer2: Renderer2) {
    const body = document.getElementsByTagName("body")[0] as HTMLElement

    let prevScrollpos = body.scrollTop;
    body.onscroll = function () {
      let currentScrollPos = body.scrollTop;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-58px";
      }
      prevScrollpos = currentScrollPos;
    }
  }
}
