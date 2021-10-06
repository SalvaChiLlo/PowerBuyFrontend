import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number = -1;
  public product: any;
  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id') ? +paramMap.get('id') : -1
      this.getProduct()
    });
  }

  private getProduct() {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product
      console.log(this.product)
    })
  }
}
