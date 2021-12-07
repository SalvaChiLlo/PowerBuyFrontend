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

        for (var i = 0; i < this.productService.shoppingCart.length; i++) {
          var idd = this.productService.shoppingCart[i].producto.id.toString()
          var cantidad = this.productService.shoppingCart[i].cantidad.toString()
          console.log("id y cantidad del producto: " + i + " es: " + idd + ", " + cantidad);
          console.log("historial: " + this.cliente._historial);
          console.log(this.cliente._historial)

          if (this.cliente._historial != null) {

            this.cliente._historial.push(idd + "-" + cantidad);
            console.log(this.cliente._historial)
            this.cliente.historial = JSON.stringify(this.cliente._historial)
            console.log(this.cliente.historial)
          }
          else {
            this.cliente._historial = [idd + "-" + cantidad];
            this.cliente.historial = JSON.stringify(this.cliente._historial);
          }
        }
        console.log(this.cliente)
        this.clienteService.updateClient(this.cliente).subscribe(cliente => {
          this.clienteService.currentClientSubject.next(this.cliente)
        })
        this.productService.finalizarCompra();
      }

    } else {
      this.router.navigate(['/signin'])
    }

  }


}
