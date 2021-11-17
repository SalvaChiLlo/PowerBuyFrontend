import { Producto } from './../models/producto.model';
import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  products: Producto[];
  productsToRender: Producto[] = [];
  productsBusqueda: Producto[];
  sortType: any;

  idProducts: number[] = [1,2,3];

  constructor(private router: Router, private auth: Auth,private productService: ProductsService, private categoriesService: CategoriasService) { }

  //no hacer caso, aun no esta probado
  isLogged() : boolean {

    if (this.auth) { return true; }
    this.router.navigate(['/login']);
    return false;
  }


  ngOnInit(): void {
    
      this.productService.getAllProducts().subscribe((products: any) => {
        this.products = products
        this.products = this.products.filter(prd => (this.idProducts.indexOf(prd.id) > -1))
        this.productsToRender = this.products
        console.log(this.products)
      })

    
    
  }
 
  getOrden(value: any) {
    this.sortType = value;


    if (value == 1 ){
      this.products = this.products.sort((prd1, prd2) => prd1.id - prd2.id)
    }
    else if (value == 2) {
      this.products = this.products.sort((prd1, prd2) => prd1.precio - prd2.precio)
    }
    else if (value == 3) {
      this.products = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio)
    }
    else if (value == 4) {
      this.products = this.products.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    else if (value == 5) {
      this.products = this.products.sort(function (prd1, prd2) {
        if (prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()) {
          return 1;
        }
        else if (prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    else if (value == 6) {
      this.products = this.products.sort((prd1, prd2) => (prd2.cantidadInicial / prd2.cantidadDisponible) - (prd1.cantidadInicial / prd1.cantidadDisponible))
    }
    else if (value == 7) {

      this.products = this.products.sort((prd1, prd2) => (prd1.cantidadInicial / prd1.cantidadDisponible) - (prd2.cantidadInicial / prd2.cantidadDisponible))
    }
    console.log("cambio de orden")    
    this.updatePage()   
  }

  updatePage() {
    this.productsToRender = [...this.products]     
  }
}
