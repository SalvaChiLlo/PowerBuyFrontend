import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Opinion } from '../product.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() opiniones: Opinion[];
  productos: Product[] = [];
  _valoraciones: any = [0, 0, 0, 0, 0]
  valoraciones: any = [0, 0, 0, 0, 0]
  valoracionGlobal: number = 0;
  productosAMostrar: Product[] = [];
  numProductosAMostrar = 3;
  puntuaciones: number[] = [];

  constructor(private productService: ProductsService) {

  }
  ngOnChanges(): void {
    this.opiniones.forEach((o: Opinion) => {
      this._valoraciones[o.valoracion - 1]++
      this.puntuaciones.push(o.valoracion)
    });
    if (this.puntuaciones.length) {
      this.valoracionGlobal = this.puntuaciones.reduce((previousValue, currentValue) => previousValue + currentValue)

      this.valoraciones[0] = Math.floor((this._valoraciones[0] / this.opiniones.length) * 100)
      this.valoraciones[1] = Math.floor((this._valoraciones[1] / this.opiniones.length) * 100)
      this.valoraciones[2] = Math.floor((this._valoraciones[2] / this.opiniones.length) * 100)
      this.valoraciones[3] = Math.floor((this._valoraciones[3] / this.opiniones.length) * 100)
      this.valoraciones[4] = Math.floor((this._valoraciones[4] / this.opiniones.length) * 100)
      this.valoracionGlobal = Math.floor(this.valoracionGlobal / this.opiniones.length * 10) / 10
    }
  }

  ngOnInit(): void {

  }
}
