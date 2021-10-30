import { Observable, Subject } from 'rxjs';
import { Cliente } from './../models/producto.model';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService implements OnChanges {
  currentClient = new Subject<Cliente>();

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  public getClientById(id: number | string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`http://localhost:9000/api/clientes/${id}`)
  }

  public getClientByEmail(email: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`http://localhost:9000/api/clientes/${email}?email=true`)
  }

  public createClient(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:9000/api/clientes', cliente)
  }
}
