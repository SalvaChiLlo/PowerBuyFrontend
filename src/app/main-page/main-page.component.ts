import { Product } from './../models/producto.model';
import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: Product[];
  productsToRender: Product[] = [];
  categories: any;
  busqueda: string = '';
  sortType: number = 1;
  constructor(private productService: ProductsService, private categoriesService: CategoriasService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products
      this.productsToRender = this.products
    })

    this.categoriesService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories
    })
  }

  getBusqueda(busqueda: string) {
    this.busqueda = busqueda;
    this.productsToRender = this.products.filter(product => {
      if (this.busqueda === '') {
        return true;
      } else if (this.busqueda !== '') {
        return JSON.stringify(product).toLowerCase().includes(this.busqueda)
      } else {
        return false;
      }

    });
  }
  getOrden(value: number){
    this.sortType = value;

    //con el switch no se pk no funciona
    /*switch(value){
        default:
          //por defecto, como se programe en la busqueda
          break;  

        case 2: //precio ascendente
          this.productsToRender = this.products.sort((prd1, prd2) => prd1.precio - prd2.precio )
          break;
          
        case 3: //precio descendente
          this.productsToRender = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio )
          break;

        case 4: //alfabeticamente ascendente 
          this.productsToRender = this.products.sort(function (prd1, prd2 ){
            if(prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()){
                return 1;
            }
            else if(prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()){
                return -1;
            }
            return 0;
          });

          break;
              
        case 5:  //alfabeticamente descendente
          this.productsToRender = this.products.sort(function (prd1, prd2 ){
          if(prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()){
              return 1;
          }
          else if(prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()){
              return -1;
            }
          return 0;

          });
          break;
                
        case 6:  //cantidad lote ascendente
          this.productsToRender = this.products.sort((prd1, prd2) => (prd2.cantidadInicial/prd2.cantidadDisponible) - (prd1.cantidadInicial/prd1.cantidadDisponible) )
          break;
                  
        case 7:  //cantidad lote descendente
          this.productsToRender = this.products.sort((prd1, prd2) => (prd1.cantidadInicial/prd1.cantidadDisponible) - (prd2.cantidadInicial/prd2.cantidadDisponible) )
          break;
    }*/

    if(value == 2){
      this.productsToRender = this.products.sort((prd1, prd2) => prd1.precio - prd2.precio )
    }
    else if(value == 3){
      this.productsToRender = this.products.sort((prd1, prd2) => prd2.precio - prd1.precio )
    }
    else if(value == 4){
      this.productsToRender = this.products.sort(function (prd1, prd2 ){
        if(prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()){
            return 1;
        }
        else if(prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()){
            return -1;
        }
        return 0;
      });
    }
    else if(value == 5){
      this.productsToRender = this.products.sort(function (prd1, prd2 ){
        if(prd1.nombre.toLocaleLowerCase() < prd2.nombre.toLocaleLowerCase()){
            return 1;
        }
        else if(prd1.nombre.toLocaleLowerCase() > prd2.nombre.toLocaleLowerCase()){
            return -1;
         }
        return 0;
        });
    }
    else if(value == 6){
      this.productsToRender = this.products.sort((prd1, prd2) => (prd2.cantidadInicial/prd2.cantidadDisponible) - (prd1.cantidadInicial/prd1.cantidadDisponible) )
    }
    else if(value == 7){
      
      this.productsToRender = this.products.sort((prd1, prd2) => (prd1.cantidadInicial/prd1.cantidadDisponible) - (prd2.cantidadInicial/prd2.cantidadDisponible) )
    }

    this.getBusqueda(this.busqueda)
    
  }
}

