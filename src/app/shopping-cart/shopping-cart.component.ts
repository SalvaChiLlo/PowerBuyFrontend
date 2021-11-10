import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Producto[] = [];
  productsToRender: Producto[] =[];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products.slice(0, 5);
      this.productsToRender = this.products.slice(0, 5);
    })
  }

}
