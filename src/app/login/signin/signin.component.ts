import { ClientesService } from './../../services/clientes.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  show: boolean = false;
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: boolean = false;
  constructor(private router: Router, private auth: Auth, private clienteService: ClientesService) {

  }

  ngOnInit(): void {

  }

  async signin(event: MouseEvent) {
    event.preventDefault();
    this.loading = true
    try {
      const fbResponse = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      if (fbResponse.user.email) {
        this.clienteService.getClientByEmail(fbResponse.user.email).subscribe(
          clientes => {
            if (clientes.length) {
              const cliente = clientes[0];
              this.clienteService.currentClient.next(cliente);
              this.router.navigate(['/home'])
            } else {
              signOut(this.auth);
            }
          },
          error => {
            this.error = true
            signOut(this.auth)
          }
        )
      }

    } catch (e) {
      this.error = true
    } finally {
      this.loading = false;
    }


  }
}
