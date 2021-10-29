import { Producto } from './../../models/producto.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {
  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
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
    for (let i = 0; i < this.numProductosAMostrar; i++) {
      this.productosAMostrar[i] = this.productos[Math.floor(Math.random() * this.productos.length - 1)]
    }
  }
}
