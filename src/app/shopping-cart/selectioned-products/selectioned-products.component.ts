import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Producto, ProductoCantidad } from '../../models/producto.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-selectioned-products',
  templateUrl: './selectioned-products.component.html',
  styleUrls: ['./selectioned-products.component.css']
})
export class SelectionedProductsComponent implements OnInit {

  constructor( public productService: ProductsService) { }

  ngOnInit(): void {
    
  }


  


}
