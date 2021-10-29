import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Opinion, Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() opiniones: Opinion[];
  productos: Producto[] = [];
  _valoraciones: any = [0, 0, 0, 0, 0]
  valoraciones: any = [0, 0, 0, 0, 0]
  valoracionGlobal: number = 0;
  productosAMostrar: Producto[] = [];
  numProductosAMostrar = 3;
  puntuaciones: number[] = [];

  constructor(private productService: ProductsService) {

  }
  ngOnChanges(): void {
    this._valoraciones = Array(5).fill(0);
    this.puntuaciones = [];
    this.opiniones.forEach((o: Opinion) => {
      this._valoraciones[o.valoracion - 1]++
      this.puntuaciones.push(o.valoracion)
    });

    if (this.puntuaciones.length) {
      this.valoracionGlobal = this.puntuaciones.reduce((previousValue, currentValue) => previousValue + currentValue)

      this.valoraciones = this._valoraciones.map((valoracion: any) => {
        return valoracion ? Math.floor((valoracion / this.opiniones.length) * 100) : 0
      })
      this.valoracionGlobal = Math.floor(this.valoracionGlobal / this.opiniones.length * 10) / 10
    }
  }

  ngOnInit(): void {

  }
}
