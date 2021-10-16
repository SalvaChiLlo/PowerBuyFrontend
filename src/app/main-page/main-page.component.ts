import { CategoriasService } from './../services/categorias.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: any;
  categories: any;
  constructor(private productService: ProductsService, private categoriesService: CategoriasService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any) => {
      this.products = products
    })

    this.categoriesService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories
    })
  }

}
