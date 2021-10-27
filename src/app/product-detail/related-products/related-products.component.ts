import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {
  productos: Product[] = [];
  productosAMostrar: Product[] = [];
  numProductosAMostrar = 3;

  constructor(private productService: ProductsService) {
    this.productService.getAllProducts().subscribe(productos => {
      this.productos = productos
      if (this.productos) {
        this.setProductosAMostrar();
      }

    });
  }
  ngOnInit(): void {
  }


  setProductosAMostrar() {
    for (let i = 0 ; i < this.numProductosAMostrar; i++) {
      this.productosAMostrar[i] = this.productos[Math.floor(Math.random() * this.productos.length-1)]
    }
    console.log(this.productosAMostrar)
  }
}
