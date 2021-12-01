import { Router } from '@angular/router';
import { ClientesService } from './../services/clientes.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente, Producto, ProductoCantidad } from '../models/producto.model';
import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  show = false;
  shoppingCart: ProductoCantidad[] = [];
  cliente: Cliente;

  constructor(private productService: ProductsService, private clienteService: ClientesService, private router: Router) {
    this.cliente = this.clienteService.currentCliente;
    this.clienteService.currentClientSubject.subscribe(cliente => {
      this.cliente = cliente
    })
  }

  ngOnInit(): void {
    this.productService.shoppingSubject.subscribe(products => {
      this.shoppingCart = products;
    })
    this.shoppingCart = this.productService.shoppingCart;
  }

  finalizarCompra() {
    if (this.cliente) {
      if (this.productService.shoppingCart.length > 0) {
        this.show = true;
        this.productService.finalizarCompra();
      }
    } else {
      this.router.navigate(['/signin'])
    }

  }


}
