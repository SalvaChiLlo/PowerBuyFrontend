import { Product } from './../../models/producto.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  price: number = -1;
  image: string = 'https://drive.google.com/uc?id=1B7MZEPUkmFHkyynxwA3gkLgnGoEPvaf5';
  titulo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.price = this.product.precio;

    if (this.product.imagenes) {
      const images = JSON.parse(this.product.imagenes);
      if (images) {
        this.image = images[0]
      }
    }

    this.formatTitulo();
  }

  private formatTitulo() {
    this.titulo = this.product.nombre.slice(0, 25) + '...'
  }

}
