import { SigninComponent } from './login/signin/signin.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
