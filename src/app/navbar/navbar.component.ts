import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
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

}
