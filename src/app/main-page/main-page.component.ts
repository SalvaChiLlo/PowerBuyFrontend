import { Product, Categoria } from './../models/producto.model';
import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: Product[];
  productsToRender: Product[] = [];
  categories: any;
  busqueda: string = '';
  prevBusqueda: string = '';
  prevCategoria: string = '0';
  categoria: string = '0';
  productsCategorias: Product[];
  productsBusqueda: Product[];
  sortType: any;
  constructor(private productService: ProductsService, private categoriesService: CategoriasService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products
      this.productsToRender = this.products
    })

    this.categoriesService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories
    })
  }

  getBusqueda(busqueda: string) {
    this.busqueda = busqueda;
    console.log(this.categoria)
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
    console.log(this.busqueda)
    this.productsCategorias = this.products.filter(product => {
      if (this.categoria == '0') {
        return true
      } else {
        return JSON.stringify(product.categorias).toLowerCase().includes(this.categoria.toLowerCase())
      }
    });
    this.mergeProductos();
  }
  getOrden(value: number) {
    this.sortType = value;

    if (value == 2) {
      this.productsToRender = this.products.sort((prd1, prd2) => prd1.precio - prd2.precio)
    }
    else if (value == 3) {
      this.productsToRender = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio)
    }
    else if (value == 4) {
      this.productsToRender = this.products.sort(function (prd1, prd2) {
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
      this.productsToRender = this.products.sort(function (prd1, prd2) {
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
      this.productsToRender = this.products.sort((prd1, prd2) => (prd2.cantidadInicial / prd2.cantidadDisponible) - (prd1.cantidadInicial / prd1.cantidadDisponible))
    }
    else if (value == 7) {

      this.productsToRender = this.products.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
    }

    this.mergeProductos()
  }

  mergeProductos() {
    if (this.busqueda !== '' && this.categoria !== '' && this.categoria !== '0') {
      this.productsToRender = this.productsBusqueda.filter(pb => {
        return this.productsCategorias.includes(pb)
      })
    } else if (this.busqueda !== '') {
      this.productsToRender = this.productsBusqueda
    } else {
      this.productsToRender = this.productsCategorias
    }
  }
}


