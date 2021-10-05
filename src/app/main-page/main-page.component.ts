import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      console.log(products)
    })
  }

}
