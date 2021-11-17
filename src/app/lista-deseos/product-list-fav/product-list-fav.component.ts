import { Producto } from './../../models/producto.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-list-fav',
  templateUrl: './product-list-fav.component.html',
  styleUrls: ['./product-list-fav.component.css']
})
export class ProductListFavComponent implements OnInit, OnChanges {

  @Input() products: Producto[] = [];
  @Input() busqueda: string = "";
  currentPage: number = 1;
  numberOfPages: number = 1;
  productsToRender: Producto[] = [];
  productsPerPage = 48;
  firstProd = 0;
  lastProd = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('products')) {
      this.setPagination();
    }
  }

  ngOnInit(): void {
    this.setPagination();
  }

  setPagination() {
    if (this.products) {
      this.numberOfPages = Math.ceil(this.products.length / this.productsPerPage)
      this.setProductsToRender();
    }
  }

  setProductsToRender() {
    const first = (this.currentPage - 1) * this.productsPerPage;
    const last = (this.currentPage) * this.productsPerPage;
    this.firstProd = first;
    if (last > this.products.length) {
      this.lastProd = this.products.length;
    } else {
      this.lastProd = last;
    }
    this.productsToRender = this.products.slice(first, last);
  }

  previousPage() {
    this.currentPage--;
    this.setProductsToRender();
    window.scroll(0, 0)
  }
  nextPage() {
    this.currentPage++;
    this.setProductsToRender();
    window.scroll(0, 0)
  }

}