import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-selectioned-products',
  templateUrl: './selectioned-products.component.html',
  styleUrls: ['./selectioned-products.component.css']
})
export class SelectionedProductsComponent implements OnInit {
    @Input() products: Producto[];
    @Input() productsToRender: Producto[];
    cantidadPorProducto: number[];
  constructor() { }

  ngOnInit(): void {
  }

  setCantidadPorProducto() {

  }

  

}
