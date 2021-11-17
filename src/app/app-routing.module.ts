import { ProvisionalAreaComponent } from './provisional-area/provisional-area.component';
import { SigninComponent } from './login/signin/signin.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './login/signup/signup.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainPageComponent
  },
  {
    path: 'listaDeseos',
    component: ListaDeseosComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['/home']) }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['/home']) }
  },
  {
    path: 'user',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['/home']) }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  },
  { path: 'home', component: MainPageComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
