import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-card-slide',
  templateUrl: './card-slide.component.html',
  styleUrls: ['./card-slide.component.css']
})
export class CardSlideComponent implements OnInit {
  @Input() product: Producto;
  @Input() cantidadProducto: number;
  constructor() { }

  ngOnInit(): void {
  }

}
