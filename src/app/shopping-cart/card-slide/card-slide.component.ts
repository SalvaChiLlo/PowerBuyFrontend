import { Component, OnInit, Input, Output} from '@angular/core';
import { Producto, ProductoCantidad } from '../../models/producto.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.css']
})
export class CardSlideComponent implements OnInit {
  @Input() product: ProductoCantidad;

  constructor( private productService: ProductsService) {}

  ngOnInit(): void {
  }

  plus(){
     if(this.product.producto.cantidadDisponible - 1 > 0){
      this.productService.addProductToCart(this.product.producto);
     }

  }

  minus(){
      this.productService.removeProductFromCart(this.product.producto);
  }

}
