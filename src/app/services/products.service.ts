import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.http.get('http://localhost:9000/api/productos')
  }

  public getProductById(id: number) {
    return this.http.get('http://localhost:9000/api/productos/' + id)
  }

  public getClientById(id: number) {
    return this.http.get('http://localhost:9000/api/clientes/' + id)
  }
}
