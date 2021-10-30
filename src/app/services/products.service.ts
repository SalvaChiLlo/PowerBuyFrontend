import { Producto } from './../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:9000/api/productos')
  }

  public getProductById(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:9000/api/productos/' + id)
  }
}
