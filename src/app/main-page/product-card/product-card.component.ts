import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  price: number = Math.ceil(Math.random() * (2000 - 100) + 2000)
  constructor() { }

  ngOnInit(): void {
  }

}
