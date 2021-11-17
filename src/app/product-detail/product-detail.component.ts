import { ProductsService } from './../services/products.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opinion, Producto } from '../models/producto.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number = -1;
  public product: Producto = {
    id: -1,
    nombre: '',
    descripcion: '',
    cantidadDisponible: -1,
    cantidadInicial: -1,
    caracteristicas: '',
    imagenes: '',
    precio: -1,
    createdAt: '',
    updatedAt: '',
    Opinions: [],
    CategoriaProductos: []
  };
  public imagenes: string[] = [];
  public opiniones: Opinion[] = [];
  public progress: number = 0;
  timestamp: number = 0;
  constructor(private route: ActivatedRoute, private productService: ProductsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id') ? +paramMap.get('id') : -1
      this.getProduct()

    });
  }

  private getProduct() {
    this.timestamp = Date.now();
    this.productService.getProductById(this.productId).subscribe((product: any) => {
      this.product = product[0]
      this.imagenes = this.product.imagenes ? JSON.parse(this.product.imagenes) : ['https://drive.google.com/uc?id=1B7MZEPUkmFHkyynxwA3gkLgnGoEPvaf5']
      this.opiniones = this.product.Opinions
      this.progress = Math.floor((this.product.cantidadDisponible / this.product.cantidadInicial) * 100)
    })
  }

  participarProducto() {
    if (this.product.cantidadDisponible > 0) {
      this.snackBar.open("Producto añadido a la cesta.", 'X');
      console.log(this.product);
      this.productService.addProductToCart(this.product);
    } else {
      this.snackBar.open("Ya no puedes participar en este producto.", 'X');
    }
  }

}
