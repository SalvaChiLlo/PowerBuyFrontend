import { environment } from './../../environments/environment';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { Cliente } from './../models/producto.model';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService implements OnChanges {
  currentClientSubject = new Subject<Cliente>();
  currentCliente: Cliente;
  isLoggedIn = new Subject<boolean>();
  private user: Observable<User>;
  private userDisposable: any;



  constructor(private http: HttpClient, private auth: Auth) {
    this.checkIfClientIsLogged();
    this.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        setTimeout(() => {
          this.user.subscribe(user => {
            if (user) {
              this.getClientByEmail(user.email).subscribe(client => {
                this.currentClientSubject.next(client[0])
                this.currentCliente = client[0]
                if (this.currentCliente.favoritos !== null) {
                  this.currentCliente._favoritos = JSON.parse(this.currentCliente.favoritos)
                } else {
                  this.currentCliente._favoritos = JSON.parse("[]")
                }

                if (this.currentCliente.historial !== null) {
                  this.currentCliente._historial = JSON.parse(this.currentCliente.historial)
                } else {
                  this.currentCliente._historial = JSON.parse("[]")
                }
              })
            }
          })
        }, 100);
      } else {
        this.currentCliente = null;
      }
    })
    this.currentClientSubject.subscribe(cliente => {
      if (cliente === null) {
        this.currentCliente = null;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public getClientById(id: number | string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.baseBackendURL + `/api/clientes/${id}`)
  }

  public getClientByEmail(email: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.baseBackendURL + `/api/clientes/${email}?email=true`)
  }

  public createClient(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.baseBackendURL + '/api/clientes', cliente)
  }
  public updateClient(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(environment.baseBackendURL + '/api/clientes', cliente)
  }

  public checkIfClientIsLogged() {
    if (this.auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.isLoggedIn.next(true)
        } else {
          this.isLoggedIn.next(false)
        }
      });
    }
  }
}
