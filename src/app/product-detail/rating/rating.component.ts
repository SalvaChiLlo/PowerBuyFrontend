import { Component, Input, OnChanges } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { OpinionesService } from 'src/app/services/opiniones.service';
import { ProductsService } from 'src/app/services/products.service';
import { Cliente, Opinion, Producto } from '../../models/producto.model';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

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
  isLoggedIn: boolean = false;
  currentCliente: Cliente;


  constructor(
    private productService: ProductsService,
    private opinionesService: OpinionesService,
    public clienteService: ClientesService,
    private auth: Auth
  ) {
    this.currentCliente = this.clienteService.currentCliente;
    this.clienteService.currentClientSubject.subscribe(cliente => {
      this.currentCliente = cliente
      this.isLoggedIn = cliente === null ? false : true
    })
  }
  ngOnChanges(): void {
    this.calculateRating();
  }

  submit(): void {

    const opinion: Opinion = {
      valoracion: this.currentRate,
      opinion: this.textRate,
      ClienteId: this.currentCliente.id,
      ProductoId: this.productoId
    }
    this.opinionesService.createOpinion(opinion).subscribe(op => {
      this.currentRate = 0
      this.textRate = ''
      this.opiniones.push(op[0])
      this.calculateRating();
    })
  }

  calculateRating() {
    this._valoraciones = Array(5).fill(0);
    this.puntuaciones = [];

    if (this.opiniones) {
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
}

