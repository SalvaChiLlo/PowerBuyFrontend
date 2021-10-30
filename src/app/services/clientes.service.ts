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
  currentClient = new Subject<Cliente>();
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
                this.currentClient.next(client[0])
              })
            }
          })
        }, 100);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
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
