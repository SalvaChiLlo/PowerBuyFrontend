import { ClientesService } from '../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/producto.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public userId: number = -1;
  public cliente: Cliente;
  public imagen: string;
  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.clientesService.currentClientSubject.subscribe(cl => {
      this.cliente = cl
    })

    this.cliente = this.clientesService.currentCliente
  }
}
