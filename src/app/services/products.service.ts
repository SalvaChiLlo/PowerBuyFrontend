import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product-detail/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:9000/api/productos')
  }

  public getProductById(id: number) {
    return this.http.get('http://localhost:9000/api/productos/' + id)
  }

  public getClientById(id: number) {
    return this.http.get('http://localhost:9000/api/clientes/' + id)
  }
}
