import { Component, OnInit } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { ClientesService } from '../services/clientes.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: Auth, private clienteService: ClientesService) {
    if (auth) {
      const user = authState(this.auth);
      const userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      });
    }
  }
  ngOnInit(): void {
  }

  async logout() {
    this.clienteService.currentClient.next(null);
    this.clienteService.cliente = null;
    await signOut(this.auth);
    this.router.navigate(['/home'])
    window.scroll(0, 0)
  }

  navigateTo(dir: string) {
    this.router.navigate([dir])
    window.scroll(0, 0)
  }
}
