import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/producto.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  placeholderImage = 'https://drive.google.com/uc?id=1MDeTJsllJwe1gbJRR_xhDOm0k3WNtaVs'
  userImage: string;
  client: Cliente | null;
  @ViewChild('navBar') navBar: ElementRef;
  constructor(private router: Router, private auth: Auth, private clienteService: ClientesService) {

  }
  ngOnInit(): void {
    this.clienteService.currentClient.subscribe(client => {
      this.client = client
      if (client) {
        this.userImage = client.imageURL;
      }
    })
  }

  async logout() {
    this.clienteService.currentClient.next(null);
    await signOut(this.auth);
    this.router.navigate(['/home'])
    window.scroll(0, 0)
  }

  close() {
    let navToggle = document.getElementsByClassName('navbar-toggler-icon');
    if (navToggle.length) {
      (navToggle[0] as HTMLElement).click();
    }
  }
}
