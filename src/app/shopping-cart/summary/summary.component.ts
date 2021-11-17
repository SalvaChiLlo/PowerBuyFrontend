import { Producto, ProductoCantidad } from '../../models/producto.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  subtotal: number = 0;
  envio: number = 0;
  impuestos: number = 0;
  total: number = 0;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.subtotal = 0;
    this.envio = 0;
    this.impuestos = 0;
    this.total = 0;
    this.productService.shoppingSubject.subscribe(_ => {
      this.subtotal = 0;
      this.envio = 0;
      this.impuestos = 0;
      this.total = 0;

      this.setSubtotal();
      this.setEnvio();
      this.setImpuestos();
      this.setTotal();
    })
    this.setSubtotal();
    this.setEnvio();
    this.setImpuestos();
    this.setTotal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSubtotal();
    this.setEnvio();
    this.setImpuestos();
    this.setTotal();
    console.log(changes)
  }

  setSubtotal() {
    this.subtotal = 0;
    if (this.productService.shoppingCart.length > 0) {
      for (var i = 0; i < this.productService.shoppingCart.length; i++) {
        this.subtotal = this.subtotal
          + this.productService.shoppingCart[i].producto.precio * this.productService.shoppingCart[i].cantidad;
      }
    }
    else { this.subtotal = 0; }
  }

  setEnvio() {
    if (this.productService.shoppingCart.length > 0) this.envio = 5;
  }

  setImpuestos() {
    this.impuestos = this.subtotal * 0.21;
  }

  setTotal() {
    this.total = this.subtotal + this.envio + this.impuestos;
  }



}
