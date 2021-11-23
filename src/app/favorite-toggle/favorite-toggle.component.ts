import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../models/producto.model';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.css']
})
export class FavoriteToggleComponent implements OnInit {
  cliente: Cliente;
  isFav: boolean = false;
  @Input('productId') productId: number;
  @Input('size') size: number;

  constructor(private clienteService: ClientesService) {
    this.cliente = this.clienteService.currentCliente;
    this.clienteService.currentClientSubject.subscribe(cliente => {
      this.cliente = cliente
      this.checkIfFav();
    })
    this.checkIfFav();
  }

  ngOnInit(): void {
    this.checkIfFav()
  }

  addToFav() {//esto se hace porque por defecto favortitos se crea null, se deberia inicializar a [] cuando se cree el cliente
    if (typeof this.cliente._favoritos !== 'undefined' && this.cliente._favoritos != null) {

      if (this.cliente._favoritos.indexOf(this.productId) < 0) {
        this.cliente._favoritos.push(this.productId)
        this.cliente.favoritos = JSON.stringify(this.cliente._favoritos)
        this.clienteService.updateClient(this.cliente).subscribe(cliente => {
          this.clienteService.currentClientSubject.next(this.cliente)
          this.checkIfFav();
        })
      }
      else {
        this.cliente._favoritos = this.cliente._favoritos.filter(prodId => prodId !== this.productId)
        this.cliente.favoritos = JSON.stringify(this.cliente._favoritos)
        this.clienteService.updateClient(this.cliente).subscribe(cliente => {
          this.clienteService.currentClientSubject.next(this.cliente)
          this.checkIfFav();
        })
      }
    }
    else {
      this.cliente._favoritos = [this.productId];
    }
    this.checkIfFav();
  }

  checkIfFav() {
    if (this.cliente && JSON.parse(this.cliente.favoritos)) {
      this.isFav = JSON.parse(this.cliente.favoritos).filter((id: number) => id === this.productId).length ? true : false
    }
  }

}
