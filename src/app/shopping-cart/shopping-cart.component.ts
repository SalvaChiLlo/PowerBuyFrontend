import { Component, OnInit } from '@angular/core';
import { Producto, ProductoCantidad } from '../models/producto.model';
import { ProductsService } from './../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  show = false;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {

  }

  finalizarCompra() {
    if (this.productService.shoppingCart.length > 0) {
      this.show = true;
      this.productService.finalizarCompra();
    }

  }


}
