import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasSubject: Subject<string> = new Subject();
  categorias = 'Todas las Categorías';
  busquedaSubject: Subject<string> = new Subject();
  busqueda = '';
  sortSubject: Subject<number> = new Subject();
  sort = 1;

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(environment.baseBackendURL + '/api/categorias');
  }
}
