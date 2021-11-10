import { Producto } from '../../models/producto.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() products: Producto[];
  subtotal: number = 0;
  envio: number = 0;
  impuestos:number = 0;
  total:number = 0;

  constructor() { }

  ngOnInit(): void {
      this.setSubtotal();
      this.setEnvio();
      console.log("paso 1");
      this.setImpuestos();
      this.setTotal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('products')) {
      console.log("paso 2");
      this.setSubtotal();
      this.setEnvio();
      this.setImpuestos();
      this.setTotal();
    }
  }

  setSubtotal() {
    console.log(this.products.length)
    for(var i = 0; i<this.products.length; i++) {
      this.subtotal = this.subtotal + this.products[i].precio;
    }
  }

  setEnvio() {
    if (this.products.length > 0) this.envio = 5;
    console.log(this.envio);
  }

  setImpuestos() {
    this.impuestos = this.subtotal * 0.21;
  }

  setTotal() {
    this.total = this.subtotal + this.envio + this.impuestos;
  }



}
