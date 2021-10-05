import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.http.get('http://localhost:9000/api/products')
  }

  public getProductById(id: number) {
    return this.http.get('http://localhost:9000/api/products/' + id)
  }
}
