import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OpinionesService } from 'src/app/services/opiniones.service';
import { ProductsService } from 'src/app/services/products.service';
import { Opinion } from '../../models/producto.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() opiniones: Opinion[] = [];
  @Input() productoId: number = -1;
  productos: Producto[] = [];
  _valoraciones: any = [0, 0, 0, 0, 0]
  valoraciones: any = [0, 0, 0, 0, 0]
  valoracionGlobal: number = 0;
  productosAMostrar: Producto[] = [];
  numProductosAMostrar = 3;
  puntuaciones: number[] = [];
  currentRate = 0;
  textRate = "";
  showForm = false;

  constructor(private productService: ProductsService, private opinionesService: OpinionesService) {

  }
  ngOnChanges(): void {
    console.log('Current rate is ' + this.currentRate)
    this._valoraciones = Array(5).fill(0);
    this.puntuaciones = [];

    if(this.opiniones) {
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

  }

  ngOnInit(): void {

  }

  submit(): void {
    const opinion: Opinion = {
      valoracion: this.currentRate,
      opinion: this.textRate,
      ClienteId: 10,
      ProductoId: this.productoId
    }
    this.opinionesService.createOpinion(opinion).subscribe(op => {
      this.currentRate = 0
      this.textRate = ''
    })
  }
}
