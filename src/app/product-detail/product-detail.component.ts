import { ProductsService } from './../services/products.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente, Opinion, Producto } from '../models/producto.model';
import { ClientesService } from '../services/clientes.service';
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
  cliente: Cliente;


  constructor(private route: ActivatedRoute, private productService: ProductsService,  private clienteService: ClientesService, private snackBar: MatSnackBar) { 
    this.cliente = this.clienteService.currentCliente;
  }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id') ? +paramMap.get('id') : -1
      this.getProduct()

    });
    this.checkIfFav()
  }

  private getProduct() {
    this.productService.getProductById(this.productId).subscribe((product: any) => {
      this.product = product[0]
      this.imagenes = JSON.parse(this.product.imagenes)
      this.opiniones = this.product.Opinions

      this.progress = Math.floor((this.product.cantidadDisponible / this.product.cantidadInicial) * 100)
    })
  }

  addToFav(){//esto se hace porque por defecto favortitos se crea null, se deberia inicializar a [] cuando se cree el cliente
    if(typeof this.cliente.favoritos !== 'undefined' && this.cliente.favoritos != null ){
      
      if(this.cliente.favoritos.indexOf(this.productId) < 0){
        this.cliente.favoritos.push(this.productId)
        console.log("añadido correctamente a favoritos")
      }
      else{
        console.log("ya esta en favoritos")
      }
    }    
    else{
    this.cliente.favoritos = [this.productId];
    }
  }

  checkIfFav(){
    /*var b1 = document.getElementById("favButton");
    if(typeof this.cliente.favoritos !== 'undefined' && this.cliente.favoritos != null ){
      if(this.cliente.favoritos.indexOf(this.productId) >= 0){ b1.className = "btn btn-outline-danger"; }
      else{b1.className = "btn btn-danger";}
    }    
    else{b1.className = "btn btn-outline-danger";}*/
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
