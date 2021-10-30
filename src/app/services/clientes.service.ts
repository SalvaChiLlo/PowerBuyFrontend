import { Observable } from 'rxjs';
import { Cliente } from './../models/producto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  public getClientById(id: number | string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`http://localhost:9000/api/clientes/${id}`)
  }

  public createClient(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:9000/api/clientes', cliente)
  }
}
