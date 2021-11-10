import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opinion, Producto } from '../models/producto.model';

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
  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id') ? +paramMap.get('id') : -1
      this.getProduct()

    });
  }

  private getProduct() {
    this.productService.getProductById(this.productId).subscribe((product: any) => {
      this.product = product[0]
      this.imagenes = JSON.parse(this.product.imagenes)
      this.opiniones = this.product.Opinions
      console.log(this.product)
      console.log(this.opiniones)
      console.log(this.product)

      this.progress = Math.floor((this.product.cantidadDisponible / this.product.cantidadInicial) * 100)
    })
  }

}
