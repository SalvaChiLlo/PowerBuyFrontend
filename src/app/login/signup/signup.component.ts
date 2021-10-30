import { Component, OnInit, Optional } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { ClientesService } from 'src/app/services/clientes.service';
import { Storage } from '@angular/fire/storage';
import { deleteUser } from '@firebase/auth';

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
        console.log(isLoggedIn)
        console.log(this.auth.currentUser)
      });
    }
  }

  ngOnInit(): void {

  }

  async signup(event: MouseEvent) {
    event.preventDefault();
    this.loading = true
    try {
      if (this.email !== '' && this.password !== '') {
        const fbResponse = await createUserWithEmailAndPassword(this.auth, this.email, this.password)
        if (fbResponse.user.email) {
          this.clienteService.createClient({
            email: this.email,
            username: this.username,
            imageURL: this.imagePreview || this.defaultImage
          }).subscribe(
            cliente => {
              console.log(cliente)
              this.clienteService.currentClient.next(cliente)
              this.router.navigate(['/home'])
            },
            error => {
              this.error = true
              deleteUser(this.auth.currentUser)
              signOut(this.auth)
            }
          )
        }
      }
    } catch (e) {
      this.error = true
      deleteUser(this.auth.currentUser)
      signOut(this.auth)
    } finally {
      this.loading = false;
      window.scroll(0, 0);
    }


  }

  async processImage(event: any) {
    if (event?.target && event?.target?.files[0]) {
      this.file = event?.target?.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.file);
      console.log(await reader.result)
    }
  }
}

