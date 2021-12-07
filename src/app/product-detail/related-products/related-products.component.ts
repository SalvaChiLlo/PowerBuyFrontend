import { Producto } from './../../models/producto.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input('update') update: number;
  @Input() product: Producto;
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
    this.productos = this.productos.filter(product => {
      return JSON.stringify(product.CategoriaProductos).toLowerCase().includes(this.product.CategoriaProductos[0].categoria.toLowerCase());
    });
    this.productos = this.productos.filter(product => {
      return product.id != this.product.id;
    });
    this.productos = this.shuffle(this.productos);
    for (let i = 0; i < this.numProductosAMostrar; i++) {
      this.productosAMostrar[i] = this.productos[i];
    }
  }

  shuffle(array:Producto[]):Producto[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
