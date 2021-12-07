import { Component, OnInit } from '@angular/core';
import { Cliente, Producto } from './../models/producto.model';
import { ProductsService } from './../services/products.service';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ClientesService } from '../services/clientes.service';


@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  products: Producto[] = [];
  productsToRender: Producto[] = [];
  cliente: Cliente;  
  loading = true;

  idProducts: string[] = [];
  cantidades: string[] = [];
  historial: string[] = [];
  

  constructor(private router: Router, private productService: ProductsService, private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.currentClientSubject.subscribe(cl => {
      this.cliente = cl
      if (this.cliente) {
        this.historial = JSON.parse(this.cliente.historial || "[]");
        this.idProducts = this.historial;
        this.getProducts();
      }
    })

    this.cliente = this.clienteService.currentCliente
    if (this.cliente) {
      this.historial = JSON.parse(this.cliente.historial || "[]");
      this.idProducts = this.historial;
      this.getProducts();
    }    
  }

  getProducts() {
    if(this.historial != null){
      for(var i = 0; i< this.historial.length; i++){
        this.cantidades[i] = this.idProducts[i].substring(this.idProducts[i].indexOf("-") + 1) 
        this.idProducts[i] = this.idProducts[i].substring(0, this.idProducts[i].indexOf("-")) 
      }
      console.log(this.cantidades.toString())
      console.log(this.idProducts.toString())
  
      this.productService.getAllProducts().subscribe((products: any) => {
        this.products = products
        if (this.idProducts != null && this.idProducts.length > 0) {
          this.products = this.products.filter(prd => (this.idProducts.indexOf(prd.id.toString()) > -1));
        }
        else {
          this.products = [];
        }
        
        this.productsToRender = this.products
        
      })

    }

    this.loading = false;
        
  }




}
