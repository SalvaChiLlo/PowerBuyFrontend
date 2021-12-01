import { AppComponent } from './../app.component';
import { RatingComponent } from './../product-detail/rating/rating.component';
import { Producto, Categoria, Opinion } from './../models/producto.model';
import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ProviderId } from 'firebase/auth';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: Producto[];
  productsToRender: Producto[] = [];
  categories: any;
  busqueda: string = '';
  prevBusqueda: string = '';
  prevCategoria: string = '0';
  categoria: string = '0';
  productsCategorias: Producto[];
  productsBusqueda: Producto[];
  sortType: any;
  providers: [RatingComponent];
  rating : RatingComponent;
  _valoraciones: any = [0, 0, 0, 0, 0];
  valoraciones: any = [0, 0, 0, 0, 0];
  opiniones: Opinion[] = [];
  puntuaciones: number[] = [];
  valoracionGlobal: number = 0;

  constructor(private productService: ProductsService, private categoriesService: CategoriasService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products
      this.productsToRender = this.products
      this.getOrden(1, true);
    })

    this.categoriesService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories
    })
  }

  getBusqueda(busqueda: string) {
    this.busqueda = busqueda;
    this.productsBusqueda = this.products.filter(product => {
      if (this.busqueda === '') {
        return true;
      } else if (this.busqueda !== '') {
        return JSON.stringify(product).toLowerCase().includes(this.busqueda.toLowerCase())
      } else {
        return false;
      }

    });

    this.mergeProductos();
  }
  filtrarCategoria(categoria: string) {
    this.categoria = categoria
    this.productsCategorias = this.products.filter(product => {
      if (this.categoria == '0') {
        return true
      } else {
        return JSON.stringify(product.CategoriaProductos).toLowerCase().includes(this.categoria.toLowerCase())
      }
    });
    this.mergeProductos();
  }
  getOrden(value: number, shouldMerge: boolean) {
    this.sortType = value;

    if (value == 1 ) {
      this.products = this.products.sort( (prd1, prd2) => {
        if (this.calcRating(prd1) < this.calcRating(prd2)) {
          console.log(this.calcRating(prd1));
          return 1;
        }
        else if (this.calcRating(prd1) > this.calcRating(prd2)) {
          return -1;
        }
        return 0;
      });
      this.productsBusqueda = this.productsBusqueda?.sort( (prd1, prd2) => {
        if (this.calcRating(prd1) < this.calcRating(prd2)) {
          return 1;
        }
        else if (this.calcRating(prd1) > this.calcRating(prd2)) {
          return -1;
        }
        return 0;
      });
      this.productsCategorias = this.productsCategorias?.sort( (prd1, prd2) => {
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
      this.productsBusqueda = this.productsBusqueda?.sort((prd1, prd2) => prd1.precio - prd2.precio)
      this.productsCategorias = this.productsCategorias?.sort((prd1, prd2) => prd1.precio - prd2.precio)
    }
    else if (value == 3) {
      this.products = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio)
      this.productsBusqueda = this.productsBusqueda?.sort((prd1, prd2) => prd2.precio - prd1.precio)
      this.productsCategorias = this.productsCategorias?.sort((prd1, prd2) => prd2.precio - prd1.precio)
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
      this.productsCategorias = this.productsCategorias?.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
      this.productsBusqueda = this.productsBusqueda?.sort(function (prd1, prd2) {
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
      this.productsBusqueda = this.productsBusqueda?.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
      this.productsCategorias = this.productsCategorias?.sort(function (prd1, prd2) {
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
      this.productsBusqueda = this.productsBusqueda?.sort((prd1, prd2) => (prd2.cantidadInicial / prd2.cantidadDisponible) - (prd1.cantidadInicial / prd1.cantidadDisponible))
      this.productsCategorias = this.productsCategorias?.sort((prd1, prd2) => (prd2.cantidadInicial / prd2.cantidadDisponible) - (prd1.cantidadInicial / prd1.cantidadDisponible))
    }
    else if (value == 7) {

      this.products = this.products.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
      this.productsCategorias = this.productsCategorias?.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
      this.productsBusqueda = this.productsBusqueda?.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
    }

    if (shouldMerge) {
      this.mergeProductos()
    }
  }

  mergeProductos() {
    if (this.busqueda !== '' && this.categoria !== '' && this.categoria !== '0') {
      this.productsToRender = this.productsBusqueda.filter(pb => {
        return this.productsCategorias.includes(pb)
      })
      // this.getOrden(this.sortType, false)
    } else if (this.busqueda !== '') {
      this.productsToRender = [...this.productsBusqueda]
      // this.getOrden(this.sortType, false)
    } else if (this.categoria !== '0') {
      this.productsToRender = [...this.productsCategorias]
      // this.getOrden(this.sortType, false)
    } else {
      this.productsToRender = [...this.products]
      // this.getOrden(this.sortType, false)
    }
  }

  calcRating(producto: Producto) : Number {
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
}


