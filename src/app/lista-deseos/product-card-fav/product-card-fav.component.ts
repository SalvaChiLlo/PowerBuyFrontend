import { Producto } from './../../models/producto.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-card-fav',
  templateUrl: './product-card-fav.component.html',
  styleUrls: ['./product-card-fav.component.css']
})
export class ProductCardFavComponent implements OnInit, OnChanges {
  @Input() product: Producto;
  price: number = -1;
  image: string = 'https://drive.google.com/uc?id=1B7MZEPUkmFHkyynxwA3gkLgnGoEPvaf5';
  titulo: string = '';

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.image = 'https://drive.google.com/uc?id=1B7MZEPUkmFHkyynxwA3gkLgnGoEPvaf5';
    if (this.product && this.product.id !== -1) {
      this.price = this.product.precio;

      if (this.product.imagenes) {
        const images = JSON.parse(this.product.imagenes);
        if (images) {
          this.image = images[0]
        }
      }
      this.formatTitulo();
    }
  }

  ngOnInit(): void {
    if (this.product) {
      this.price = this.product.precio;

      if (this.product.imagenes) {
        const images = JSON.parse(this.product.imagenes);
        if (images) {
          this.image = images[0]
        }
      }

      this.formatTitulo();
    }
  }

  private formatTitulo() {
    this.titulo = this.product.nombre.slice(0, 25) + '...'
  }

  scroll() {
    window.scroll(0, 0)
  }

}
