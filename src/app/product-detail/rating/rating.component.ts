import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Opinion } from '../product.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() opiniones:Opinion[];
  _valoraciones: any = [0,0,0,0,0]
  valoraciones: any = [0,0,0,0,0]
  valoracionGlobal: number = 0;
  puntuaciones: number[] = [];

  constructor() { }
  ngOnChanges(): void {
    this.opiniones.forEach((o:Opinion) => {
      this._valoraciones[o.valoracion-1]++
      this.puntuaciones.push(o.valoracion)
    });

    this.valoracionGlobal = this.puntuaciones.reduce((previousValue, currentValue) => previousValue + currentValue)

    console.log("La valoracion global es " + this.valoracionGlobal)


    this.valoraciones[0] = Math.floor((this._valoraciones[0] / this.opiniones.length) * 100)
    this.valoraciones[1] = Math.floor((this._valoraciones[1] / this.opiniones.length) * 100)
    this.valoraciones[2] = Math.floor((this._valoraciones[2] / this.opiniones.length) * 100)
    this.valoraciones[3] = Math.floor((this._valoraciones[3] / this.opiniones.length) * 100)
    this.valoraciones[4] = Math.floor((this._valoraciones[4] / this.opiniones.length) * 100)
    this.valoracionGlobal = Math.floor(this.valoracionGlobal / this.opiniones.length * 10) / 10
    console.log("La valoracion global es " + this.valoracionGlobal)
  }

  ngOnInit(): void {  }

}
