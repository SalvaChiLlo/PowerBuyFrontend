
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id = 2;

  constructor() { }

  ngOnInit(): void {

  }

  scroll() {
    window.scroll(0, 0)
  }
}
