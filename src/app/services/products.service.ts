import { environment } from './../../environments/environment';
import { Producto, ProductoCantidad } from './../models/producto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  shoppingCart: ProductoCantidad[] = JSON.parse(localStorage.getItem("Carro")) || [];
  shoppingSubject = new Subject<ProductoCantidad[]>();

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Producto[]> {

    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Cache-Control', 'public');

    return this.http.get<Producto[]>(environment.baseBackendURL + '/api/productos', {
      headers
    })
  }

  // public getProductById(id: number) {
  //   return this.http.get('http://localhost:9000/api/productos/' + id)
  // }

  public getProductById(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.baseBackendURL + '/api/productos/' + id)
  }


  public addProductToCart(product: Producto) {
    var posicion = this.isAlready(product);
    if (posicion.length == 0) {
      let nuevoProducto: ProductoCantidad = {
        producto: product,
        cantidad: 1
      };
      this.shoppingCart.push(nuevoProducto);
      this.shoppingCart = [...this.shoppingCart]
    }
    else { posicion[0].cantidad++; }
    localStorage.setItem("Carro", JSON.stringify(this.shoppingCart))
    this.shoppingSubject.next(this.shoppingCart);
  }

  public removeProductFromCart(product: Producto) {
    var posicion = this.isAlready(product);
    if (posicion[0].cantidad > 1) { posicion[0].cantidad-- }
    else { this.shoppingCart = this.shoppingCart.filter(p => p.producto.id != product.id) }
    localStorage.setItem("Carro", JSON.stringify(this.shoppingCart))
    this.shoppingSubject.next(this.shoppingCart);
  }

  public finalizarCompra() {
    this.shoppingCart = [];
    localStorage.setItem("Carro", JSON.stringify(this.shoppingCart))
    this.shoppingSubject.next(this.shoppingCart);
  }


  private isAlready(product: Producto): ProductoCantidad[] {
    return this.shoppingCart.filter(p => p.producto.id == product.id);
  }
}
