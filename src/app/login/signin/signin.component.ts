import { ClientesService } from './../../services/clientes.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';
import { throwError } from 'rxjs';

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
  errorMessage: string = 'El correo o la contraseña son incorrectos.';

  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private router: Router, private auth: Auth, private clienteService: ClientesService) {

  }

  ngOnInit(): void {

  }

  async signin(event: MouseEvent) {
    event.preventDefault();
    this.loading = true
    try {
      this.error = false;
      this.emailError = false;
      this.passwordError = false;
      this.errorMessage = '';
      const validationEmail = this.validateEmail(this.email)
      const validationPassword = this.validatePassword(this.password)

      if (validationEmail && validationPassword) {
        const fbResponse = await signInWithEmailAndPassword(this.auth, this.email, this.password);
        if (fbResponse.user.email) {
          this.clienteService.getClientByEmail(fbResponse.user.email).subscribe(
            clientes => {
              if (clientes.length) {
                const cliente = clientes[0];
                this.clienteService.currentClientSubject.next(cliente);
                this.router.navigate(['/home'])
              } else {
                signOut(this.auth);
              }
            },
            error => {
              this.error = true;
              this.errorMessage = 'El correo o la contraseña son incorrectos.';
              signOut(this.auth)
              this.loading = false;
            }
          )
        }

      }

    } catch (e) {
      this.error = true;
      this.errorMessage = 'El correo o la contraseña son incorrectos.';
      this.loading = false;
    } finally {
      window.scroll(0, 0);
    }
  }
  validatePassword(password: string): boolean {
    if (password.length < 8) {
      this.error = true;
      this.passwordError = true;
      this.errorMessage += 'La contraseña debe de ser de al menos 8 carácteres. ';
      this.loading = false;
      this.loading = false;
      return false
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase()) === false) {
      this.error = true;
      this.emailError = true;
      this.errorMessage += 'El correo no tiene el formato correcto. ';
      this.loading = false;
      return false;
    }
    return true
  }
}
