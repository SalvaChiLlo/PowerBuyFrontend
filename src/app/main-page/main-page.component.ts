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
        return JSON.stringify(product).toLowerCase().includes(this.busqueda)
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

  mergeProductos() {
    if(this.busqueda !== '' && this.categoria !== '' && this.categoria!== '0') {
      this.productsToRender = this.productsBusqueda.filter(pb => {
        return this.productsCategorias.includes(pb)
      })
    } else if(this.busqueda !== '') {
      this.productsToRender = this.productsBusqueda
    } else {
      this.productsToRender = this.productsCategorias
    }
  }
}
