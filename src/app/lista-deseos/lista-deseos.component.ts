import { Cliente, Opinion, Producto } from './../models/producto.model';
import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ClientesService } from '../services/clientes.service';
import { RatingComponent } from '../product-detail/rating/rating.component';


@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  products: Producto[] = [];
  productsToRender: Producto[] = [];
  productsBusqueda: Producto[];
  sortType: any;
  cliente: Cliente;
  idProducts: number[] = [];
  loading = true;

  providers: [RatingComponent];
  rating: RatingComponent;
  _valoraciones: any = [0, 0, 0, 0, 0];
  valoraciones: any = [0, 0, 0, 0, 0];
  opiniones: Opinion[] = [];
  puntuaciones: number[] = [];
  valoracionGlobal: number = 0;


  constructor(private router: Router, private auth: Auth, private productService: ProductsService, private categoriesService: CategoriasService, private clienteService: ClientesService) {
  }

  ngOnInit(): void {
    this.clienteService.currentClientSubject.subscribe(cl => {
      this.cliente = cl
      if (this.cliente) {
        this.idProducts = JSON.parse(this.cliente.favoritos || "[]");
        this.getProducts();
      }
    })

    this.cliente = this.clienteService.currentCliente
    if (this.cliente) {
      this.idProducts = JSON.parse(this.cliente.favoritos || "[]");
      this.getProducts();
    }

    this.categoriesService.sortSubject.next(1)
    this.categoriesService.sortSubject.subscribe(sort => {
      this.getOrden(sort)
    })
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products
      if (this.idProducts != null && this.idProducts.length > 0) {
        this.products = this.products.filter(prd => (this.idProducts.indexOf(prd.id) > -1));
      }
      else {
        this.products = [];
      }

      this.productsToRender = this.products
      this.loading = false;
    })
  }

  calcRating(producto: Producto): Number {
    this._valoraciones = Array(5).fill(0);
    this.puntuaciones = [];
    this.opiniones = producto.Opinions;

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
    return this.valoracionGlobal;
  }

  getOrden(value: any) {
    this.sortType = value;

    if (value == 1) {
      this.products = this.products.sort((prd1, prd2) => {
        if (this.calcRating(prd1) < this.calcRating(prd2)) {
          return 1;
        }
        else if (this.calcRating(prd1) > this.calcRating(prd2)) {
          return -1;
        }
        return 0;
      });
    }
    else if (value == 2) {
      this.products = this.products.sort((prd1, prd2) => prd1.precio - prd2.precio)
    }
    else if (value == 3) {
      this.products = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio)
    }
    else if (value == 4) {
      this.products = this.products.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    else if (value == 5) {
      this.products = this.products.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    else if (value == 6) {
      this.products = this.products.sort((prd1, prd2) => (prd2.cantidadInicial / prd2.cantidadDisponible) - (prd1.cantidadInicial / prd1.cantidadDisponible))
    }
    else if (value == 7) {

      this.products = this.products.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
    }
    this.updatePage()
  }

  updatePage() {
    this.productsToRender = [...this.products]
  }
}
