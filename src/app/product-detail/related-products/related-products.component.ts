import { Producto } from './../../models/producto.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit, OnChanges {
  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
  numProductosAMostrar = 3;
  @Input('update') update: number;
  constructor(private productService: ProductsService) {
    this.productService.getAllProducts().subscribe(productos => {
      this.productos = productos
      if (this.productos) {
        this.setProductosAMostrar();
      }

    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setProductosAMostrar()
  }

  ngOnInit(): void {
  }


  setProductosAMostrar() {
    for (let i = 0; i < this.numProductosAMostrar; i++) {
      this.productosAMostrar[i] = this.productos[Math.floor(Math.random() * this.productos.length - 1)]
    }
  }
}
