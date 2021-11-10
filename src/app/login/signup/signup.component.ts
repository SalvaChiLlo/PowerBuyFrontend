import { Component, OnInit, Optional } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { ClientesService } from 'src/app/services/clientes.service';
import { Storage } from '@angular/fire/storage';
import { deleteUser } from '@firebase/auth';
import { FirebaseError } from '@angular/fire/app';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  show: boolean = false;
  email: string = '';
  password: string = '';
  username: string = '';
  file: any;
  imagePreview: any;
  loading: boolean = false;
  defaultImage: string = `https://robohash.org/${Math.floor(Math.random() * 9000)}.png`
  error: boolean = false;
  errorMessage: string = 'El correo o la contraseña son incorrectos.';

  emailError: boolean = false;
  passwordError: boolean = false;
  usernameError: boolean = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private clienteService: ClientesService,
    private storage: Storage
  ) {
    if (auth) {
      const user = authState(this.auth);
      const userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
      });
    }
  }

  ngOnInit(): void {

  }

  async signup(event: MouseEvent) {
    event.preventDefault();
    this.loading = true
    try {
      this.error = false;
      this.emailError = false;
      this.passwordError = false;
      this.usernameError = false;
      this.errorMessage = '';
      const validationEmail = this.validateEmail(this.email)
      const validationUsername = this.validateUsername(this.username)
      const validationPassword = this.validatePassword(this.password)
      if (validationEmail && validationPassword && validationUsername) {
        const fbResponse = await createUserWithEmailAndPassword(this.auth, this.email, this.password)
        if (fbResponse.user.email) {
          this.clienteService.createClient({
            email: this.email,
            username: this.username,
            imageURL: this.imagePreview || this.defaultImage
          }).subscribe(
            cliente => {
              this.clienteService.currentClient.next(cliente)
              this.router.navigate(['/home'])
            },
            error => {
              this.error = true
              this.errorMessage = 'El correo o la contraseña son incorrectos.';
              deleteUser(this.auth.currentUser)
              signOut(this.auth)
              this.loading = false;
            }
          )
        }
      }
    } catch (e) {
      this.error = true
      this.errorMessage = 'El correo o la contraseña son incorrectos.';
      if ((e as FirebaseError).message === 'Firebase: Error (auth/email-already-in-use).') {
        this.errorMessage = 'El correo que has introducido ya está en uso';
      }
      this.loading = false;
      deleteUser(this.auth.currentUser)
      signOut(this.auth)
    } finally {
      window.scroll(0, 0);
    }


  }

  async processImage(event: any) {
    if (typeof FileReader === 'function') {

      if (event?.target && event?.target?.files[0]) {
        this.file = event?.target?.files[0];
        this.file = await imageCompression(this.file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        })
        const reader = new FileReader();
        reader.onload = event => {
          this.imagePreview = event.target.result
        };
        reader.readAsDataURL(this.file);
      } else {
        alert('Your browser does not support FileReader');
      }
    }
  }

  validatePassword(password: string): boolean {
    if (password.length < 8) {
      this.error = true;
      this.passwordError = true;
      this.errorMessage += 'La contraseña debe de ser de al menos 8 carácteres. ';
      this.loading = false;
      return false
    }
    return true;
  }

  validateUsername(username: string): boolean {
    if (username.length < 5) {
      this.error = true;
      this.usernameError = true;
      this.errorMessage += 'El nombre de usuario debe de ser de al menos 5 carácteres. ';
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

