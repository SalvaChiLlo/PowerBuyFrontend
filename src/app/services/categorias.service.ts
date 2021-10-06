import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get('http://localhost:9000/api/categorias');
  }
}
