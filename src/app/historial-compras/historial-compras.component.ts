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

  idProducts: number[] = [];
  cantidades: number[] = [];
  historial: string[] = [];


  constructor(private router: Router, private productService: ProductsService, private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.currentClientSubject.subscribe(cl => {
      this.cliente = cl
      if (this.cliente) {
        this.historial = JSON.parse(this.cliente.historial || "[]");
        this.getProducts();
      }
    })

    this.cliente = this.clienteService.currentCliente
    if (this.cliente) {
      this.historial = JSON.parse(this.cliente.historial || "[]");
      this.getProducts();
    }
  }

  getProducts() {
    console.log(this.historial)
    if (this.historial != null) {
      this.historial.forEach(item => {
        this.cantidades.push(+item.split("-")[1])
        this.idProducts.push(+item.split("-")[0])
      })

      console.log(this.cantidades)
      console.log(this.idProducts)

      this.productService.getAllProducts().subscribe((products: Producto[]) => {

        this.idProducts.forEach(id => {
          this.productsToRender.push(products.filter(prod => prod.id === id)[0])
        })

        this.loading = false;
        console.log(this.productsToRender)
      })

    }


  }




}
